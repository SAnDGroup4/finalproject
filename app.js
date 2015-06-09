
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  course = require('./routes/course'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path');
var _ = require('underscore');

var local = require('./config/local');

var app = module.exports = express();


/**
 * Configuration
 */


app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1")
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('connect-livereload')());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/name', api.name);

// Google API
app.get('/api/tokensignin', api.tokenSignIn);

// Course API
app.get('/course/:year/:semester', course.listCoursesBySemester);

// User API
app.get('/user/listusers', user.listUsers);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), app.get('ipaddress'),function () {
  console.log('Express server listening on port ' + app.get('port'));
});
