var express		= require('express'),
	app			= express(),
	port		= process.env.PORT || 8080,
	server		= require('http').createServer(app),
	mongoose	= require('mongoose'),
	passport	= require('passport'),
	flash		= require('connect-flash'),

	morgan		= require('morgan');
	cookieParser= require('cookie-parser'),
	bodyParser	= require('body-parser'),
	session		= require('express-session'),
	
	configDB	= require('./config/database.js'),
	route		= require('./app/routes.js');

// Set-up	============================================
//mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.set('temp', __dirname + '/public/temp');

app.use(session({ secret: process.env.SKOPOS_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static( __dirname +'/public'));

// Routes	============================================

route(app,passport);

// Run		============================================

app.listen(port,function(){
	console.log("Listening port: " + port);
});