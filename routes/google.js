var CLIENT_ID = '998708767567-il73o9ta6h4jsb4n644apn97tb2a5rl3';
var CLIENT_SECRET = 'AQdW-zh3ALolTxOBerMBKzaN';
var REDIRECT_URL = 'http://gceiba.ga/auth';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/drive'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});


exports.redirectAuth = function(req, res){
	console.log(url);
	res.redirect(url);
};

exports.getAuthCode = function(req, res){
	oauth2Client.code = req.query.code;
	console.log(oauth2Client.code);
	console.log('success');
	res.redirect('http://tw.yahoo.com');
}