
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  google = require('./routes/google'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  user = require('./routes/user'),
  course = require('./routes/course'),
  http = require('http'),
  session = require('express-session'),
  local = require('./config/local'),
  path = require('path'),
  _ = require('underscore');

var local = require('./config/local');

var app = module.exports = express();

/**
 * Configuration
 */
var RedisStore = require('connect-redis')(session);
var sessionRedis = new RedisStore(local.session.redis);

function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  var origin = req.headers.origin;
  if (_.contains(app.get('allowed_origins'), origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}


app.use(session({
    // store: sessionRedis,
    secret: "SAfinalproject",
    cookie: {
      expires: new Date(Date.now() + 30*24*60*60*1000),
      maxAge: 30*24*60*60*1000
    },
    resave: true,
    saveUninitialized: true
}));
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1")
// app.set('ipaddress', "120.124.97.65");
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
// app.set('port', 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(allowCrossDomain);
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
app.get('/glogin', google.glogin);
app.get('/callback', google.callback);
app.get('/user', google.createUser);
app.get('/logout', function(req, res){
  // req.logout();
  req.session.destroy(function() {
    res.render("login");
  });
});

// Google API
// app.get('/api/tokensignin', api.tokenSignIn);
app.post('/token', google.getToken);
// Course API
app.get('/course/listcourses', course.listCourses); //list all courses
app.get('/course/:year/:semester', course.listCoursesBySemester); //list courses by specifying semester

// User API
app.get('/user/listusers', user.listUsers);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), app.get('ipaddress'),function () {
  console.log('Express server listening on '+app.get('ipaddress')+":" + app.get('port'));
});
