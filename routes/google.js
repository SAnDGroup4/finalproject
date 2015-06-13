var CLIENT_ID = '998708767567-il73o9ta6h4jsb4n644apn97tb2a5rl3';
var CLIENT_SECRET = 'AQdW-zh3ALolTxOBerMBKzaN';
var REDIRECT_URL = 'http://localhost:8080/callback';
var scopes = [
  'https://www.googleapis.com/auth/drive'
];
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// var qs = require("qs");

// var local = require("../config/local");
// var Sequelize = require('sequelize');
// var sequelize = new Sequelize(
// 		local.model.mysql.database,
// 		local.model.mysql.account,
// 		local.model.mysql.password,
// 		local.model.mysql.options
// );

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


exports.glogin = function(req, res) {
	console.log('get glogin');
	console.log(req.session.isLogin);
	if(req.session.isLogin)
		res.redirect('/');
    // Generate a unique number that will be used to check if any hijacking
    // was performed during the OAuth flow
    else{
	    state = Math.floor(Math.random() * 1e18);
	    var authUrl = oauth2Client.generateAuthUrl({
	      response_type: "code",
		  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
		  state: state,
		  scope: scopes, // If you only need one scope you can pass it as string
		  approval_prompt: 'force'
		});
		console.log('redirect authURL');
	    res.redirect(authUrl);
	}
};


exports.callback = function(req, res) {
  
    // Collect the data contained in the querystring
    var code = req.query.code
      , cb_state = req.query.state
      , error = req.query.error;
  	console.log('get callback');
  	console.log(req.session.isLogin);
    // Verify the 'state' variable generated during '/login' equals what was passed back
    if (state == cb_state) {
        if (code !== undefined) {
        	req.session.isLogin = true;
          	oauth2Client.getToken(code, function(err, tokens) {
			  // Now tokens contains an access_token and an optional refresh_token. Save them.
			  if(!err) {
			  	console.log('process tokens');
			  	console.log(tokens);
			    oauth2Client.setCredentials(tokens);
			    req.session.tokens = tokens;
			    console.log(req.session.isLogin);
			  }
			  else{
			  	console.error("Error occured: ", err);
			  }
			});


            // Setup params and URL used to call API to obtain an access_token
            // var params = {
            //     code: code,
            //     client_id: CLIENT_ID,
            //     client_secret: CLIENT_SECRET,
            //     redirect_uri: REDIRECT_URL,
            //     grant_type: "authorization_code"
            // };
            // var url = "https://www.googleapis.com/oauth2/v3/token";
            
            // Send the API request
            // request.post(url, {form: params}, function(err, resp, body) {
              
                // Handle any errors that may occur
                // if (err) return console.error("Error occured: ", err);
                // var results = JSON.parse(body);
                // if (results.error) return console.error("Error returned from Google: ", results.error);
                
                // Retrieve and store access_token to session
                // access_token = results.access_token;
                // token_type = results.token_type;
                // expires = results.expires_in;
                // Close the popup. This will trigger the client (index.html) to redirect
                // to '/user' which will test out the access_token.
                // var output = '<html><head></head><body onload="window.close();">Close this window</body></html>';
                // res.writeHead(200, {'Content-Type': 'text/html'});
                console.log('redirect /');
                console.log(req.session.isLogin);
            res.redirect('/');
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

exports.user = function(req, res) {
  	var access_token = oauth2Client.credentials.access_token;
    // Check to see if user has an access_token first
    if (access_token) {
      
        // URL endpoint and params needed to make the API call  
        var url = "https://www.googleapis.com/oauth2/v1/userinfo";
        var params = {
            access_token: access_token
        };

        // Send the request
        request.get({url: url, qs: params}, function(err, resp, user) {
            // Check for errors
            if (err) return console.error("Error occured: ", err);
            
            // Send output as response
            // var output = "<h1>Your User Details</h1><pre>" + user + "</pre>";
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.end(output);
            res.json(user);
            console.log(user);
        });
    } else {
        console.log("Couldn't verify user was authenticated. Redirecting to /");
        res.redirect("/");
    }
};