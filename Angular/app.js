

/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path');

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://13.56.16.227:27017/SpartanUnited";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var login = require("./routes/login");
var index=require("./routes/index");
var passport = require('passport');
require('./routes/passport')(passport);

//var session = require('client-sessions');

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'CMPE281_SpartanUnited',
	resave: true,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(passport.initialize());

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

//GET Requests
app.get('/', routes.index);
app.get('/index',index.re);
app.get('/index_student',index.re1);
app.get('/index_student_subjects',index.re1);
app.get('/index_student_grades',index.re1);
app.get('/index_teacher',index.re1); 
app.get('/grade_assignment',index.re1); 
app.get('/class_performance',index.re1); 
app.get('/my_class',index.re1); 
app.get('/contact_teacher',index.re1);
app.get('/contact_admin',index.re1);
app.get('/contact_admin_teacher',index.re1);
app.get('/contact_student',index.re1);
app.get('/admin',index.re1);
app.get('/admin_index',index.re1);
app.get('/admin_student',index.re1);
app.get('/admin_teacher',index.re1);
app.get('/student_to_student',index.re1);



app.post('/checklogin', login.checkLogin);
app.post('/registeruser', login.registeruser);
app.post('/fetchall', login.fetchall);
app.post('/fetch_user', login.fetch_user);
app.post('/post_grades', login.post_grades);
app.post('/send_message_teacher',login.send_message_teacher);
app.post('/send_message_student',login.send_message_student);
app.post('/send_message_admin',login.send_message_admin);
app.post('/init_admin',login.init_admin);
app.post('/init_student_to_student',login.init_student_to_student);



//

//connect to the mongo collection session and then createServer
    mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
 });	
