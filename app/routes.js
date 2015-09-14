var fs	= require('fs');
var userc = require('./controllers/userController');

module.exports = function(app, passport) {
	app.get('/',function(req,res){
		res.render('index.ejs');
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect	: '/login',
		failureFlash	: true
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect	: '/',
		failureRedirect	: '/signup',
		failureFlash	: true
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		userc.getTranscriptions(req, function(transcriptions){
			res.render('profile.ejs', {
				user : req.user,
				transcriptions : transcriptions,
				message:req.flash('successUpdate')
			});
		});
	});

	app.post('/profile', isLoggedIn, function(req, res) {
		console.log("User posted to profile:  " + req.user);

		var user	= req.user;
		var nombre	= req.body.nombre;
		var email	= req.body.email;
		var idioma	= req.body.idioma;

		user.local.nombre	= nombre;
		user.local.email	= email;
		user.local.idioma	= idioma;

		user.save();

		req.flash('successUpdate','Actualizacion exitosa');
		res.redirect('/profile');
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/solo', function(req,res) {
			res.render('soloplay.ejs');
	});

	app.post('/solo', isLoggedIn, function(req, res){
		userc.saveTranscription(req, function(err){
			if(err) throw err;
		});
	});

	app.post('/solo/download', function(req, res){
		var filePath = __dirname + 'file.srt';
		fs.writeFile(filePath, req.body.data, function(err){
			if(err) throw err;
			res.writeHead(200,{'content-type':'application/x-subrip'});
			//TODO : return file url.
			res.end('temp/files/filename.srt');
		});
	});
};

// Helpers

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}