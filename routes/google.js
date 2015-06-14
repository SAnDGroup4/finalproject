var CLIENT_ID = '998708767567-il73o9ta6h4jsb4n644apn97tb2a5rl3';
var CLIENT_SECRET = 'AQdW-zh3ALolTxOBerMBKzaN';
var REDIRECT_URL = 'http://localhost:8080/callback';
var scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/photos'
];
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var request = require('request');
var drive = google.drive('v2');
var user = require('./user.js');
var rootFolderID = '';


// var qs = require("qs");

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);
var file = sequelize.define('File', {
        FID: Sequelize.TEXT, 
        FPARENT:Sequelize.TEXT,
        FNAME:Sequelize.TEXT,
        FOWNER:Sequelize.TEXT,
    },{
        tableName: 'SA_file'
    });

var user = sequelize.define('User', {
        UID: { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true }, 
        UACCOUNT : Sequelize.TEXT,
        UPASSWORD : Sequelize.TEXT,
        GACCOUNT : Sequelize.TEXT,
        G_REFRESH_TOKEN : Sequelize.TEXT,
        ADMIN : Sequelize.BOOLEAN,
        UNAME : Sequelize.TEXT,
        STUID : Sequelize.TEXT
    },{
        tableName: 'SA_user'
    });

var course = sequelize.define('Course', {
    
        CID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
        CNAME:Sequelize.TEXT,
        CINFO:Sequelize.TEXT,
        CTEACHER:Sequelize.TEXT,
        CYEAR:Sequelize.TEXT,
        CSEMESTER:Sequelize.TEXT,
        CNUMBER:Sequelize.TEXT,
        CTIME:Sequelize.TEXT,
        CCLASSROOM:Sequelize.TEXT,
        CTARGET:Sequelize.TEXT,
        Note:Sequelize.TEXT
    },{
        tableName: 'SA_course'
});

// var state = ''
//   , access_token = ''
//   , token_type = ''
//   , expires = '';

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, {tokenUrl: "https://www.googleapis.com/oauth2/v3/token"});

// generate a url that asks permissions for Google Drive





// exports.redirectAuth = function(req, res){
// 	console.log(callbackURL);
// 	res.redirect(callbackURL);
// };

// exports.getAuthCode = function(req, res){
// 	oauth2Client.code = req.query.code;
// 	console.log(oauth2Client.code);
// 	console.log('success');
// 	res.redirect('http://tw.yahoo.com');
// }
exports.getToken = function(req, res){
	var state={access_token:'', isLogin:false};
  	oauth2Client.getAccessToken(function(err, token, response){
  		if(!err){
	  		state.access_token = token;
	  		state.isLogin = true;
  		}
  	});
  	res.json(state);
};

exports.glogin = function(req, res) {
	if(req.session.isLogin)
		res.render('/');
    // Generate a unique number that will be used to check if any hijacking
    // was performed during the OAuth flow
    else{
	    state = Math.floor(Math.random() * 1e18);
	    var authUrl = oauth2Client.generateAuthUrl({
	      response_type: "code",
		  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
		  state: state,
		  scope: scopes, // If you only need one scope you can pass it as string
		  approval_prompt: 'force',
		  display: 'popup'
		});
	    res.writeHead(200, {'Content-Type': 'text/plain'});
    	res.end(authUrl);
	}
};


exports.callback = function(req, res) {
    // Collect the data contained in the querystring
    var code = req.query.code
      , cb_state = req.query.state
      , error = req.query.error;
    // Verify the 'state' variable generated during '/login' equals what was passed back
    if (state == cb_state) {
        if (code !== undefined) {
        	// req.session.isLogin = true;
          	oauth2Client.getToken(code, function(err, tokens) {
			  // Now tokens contains an access_token and an optional refresh_token. Save them.
			  if(!err) {
			    oauth2Client.setCredentials(tokens);
			  }
			  else{
			  	console.error("Error occured: ", err);
			  }
			});
			var output = '<html><head></head><body onload="window.close();">Close this window</body></html>';
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(output);
        } else {
            console.log("Code is undefined: " + code);
            console.log("Error: " + error);
            res.redirect('/');
        }
    } else {
        console.log('Mismatch with variable "state". Redirecting to /');
        res.redirect("/");
    }
};

exports.createUser = function(req, res) {
	req.session.isLogin = true;
	var params={'auth': oauth2Client };
  	drive.about.get(params, function (err, response) {
	  if (err) {
	    console.log('Encountered error', err);
	  } else {
	  	console.log('create root folder');
	  	request.post({url:'http://localhost:8080/createfolder', form: {folder_name:'gCeiba', description: 'gCeiba Root Folder'}}
			,function(err,httpResponse,body){
				console.log(err);
				console.log(body);
				rootFolderID = body.id;
		})

	  	user.build({GACCOUNT: response.user.emailAddress, G_REFRESH_TOKEN: oauth2Client.credentials.refresh_token,
			ADMIN: 1, UNAME: response.name})
		.save().then().catch(function(err){
	            console.log(err);
		});
	  }
	});
  	res.redirect('/');
};

exports.createFolder = function(req, res){
	var folder_name = req.body.folder_name;
	var under_id = req.body.under_id;
	var description = req.body.description;
	var folder_id = "";
	var params = {
		"title": folder_name,
		"parents": [{"id":under_id}],
	  	"mimeType": "application/vnd.google-apps.folder",
	};
	drive.files.insert({'resource':params, "auth": oauth2Client}, function (err, response) {
		if(err){
			console.log('Encountered error', err);
		} else{
			file.build({FID: response.id, FPARENT: response.parents[0].id,
	  		FNAME: folder_name, FOWNER: response.ownerNames[0]})
	  		.save().then(function(folder){
	  			console.log(folder);
	  			res.json(folder);
	  		}).catch(function(err){
	  			console.log(err);
	  		});
		}

	});

};

function getRootID(){

}


exports.addCourse = function(req, res){
	var cname = req.body.Course_name;
	var year = req.body.year;
	var semester = req.body.semester;
	var time = req.body.Time;
	var room = req.body.Classroom;
	var note = req.body.Note;
	course.build({CNAME: cname, CYEAR: year, CSEMESTER: semester,
		CTIME:time, CCLASSROOM: room, Note: note})
	.save().then(function(course){
		var folderid='';
		request.post({url:'/createfolder', form: {folder_name:cname, description: 'course root folder', under_id: rootFolderID}}, 
			function(err,httpResponse,body){folderid = httpResponse.id;});

		request.post({url:'/createfolder', form: {folder_name:''+year+'-'+semester, under_id: folderid}}, 
			function(err,httpResponse,body){folderid = httpResponse.id;});

		request.post({url:'/createfolder', form: {folder_name:'HW', under_id: folderid}}, 
			function(err,httpResponse,body){folderid = httpResponse.id;});

		request.post({url:'/createfolder', form: {folder_name:'Project', under_id: folderid}}, 
			function(err,httpResponse,body){folderid = httpResponse.id;});

	}).catch(function(err){
		console.log(err);
	});
};