var fs	= require('fs');
var userc = require('./controllers/userController');

module.exports = function(app, passport) {

	/* ============================ PUBLIC USERS ============================*/

	app.get('/',function(req,res){
		res.render('index.ejs',{user:req.user});
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


	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/solo', function(req,res) {
		res.render('soloplay.ejs',{transcription:false});
	});

		/*
		TODO: this route should not be a route
		because if user is logged in it will change.
	*/
	app.post('/solo/:id*?/download', function(req, res){
		var filePath = __dirname + 'file.srt';
		fs.writeFile(filePath, req.body.data, function(err){
			if(err) throw err;
			res.writeHead(200,{'content-type':'application/x-subrip'});
			//TODO : return file url.
			res.end('temp/files/filename.srt');
		});
	});

	/* ============================ LOGGED USERS ============================*/

	app.get('/profile', isLoggedIn, function(req, res) {
		userc.getTranscriptions(req, function(transcriptions){
			res.render('profile.ejs', {
				user : req.user,
				transcriptions : transcriptions,
				message:req.flash('updateStatus')
			});
		});
	});

	app.post('/profile', isLoggedIn, function(req, res) {
		console.log("User posted to profile:  " + req.user);
		userc.updateUserInfo(req,function(err){
			if(err) req.flash('updateStatus','No se pudo realizar la actualizacion');
			else req.flash('updateStatus','Actualizacion exitosa');
			res.redirect('/profile');
		});
	});

	app.get('/solo/new', isLoggedIn, function(req, res){
		userc.newTranscription(req, function(transcription){
			res.render('soloplay.ejs',{transcription:transcription});
		});
	});

	app.get('/solo/:id', isLoggedIn, function(req, res){
		userc.getTranscriptionById(req.params.id,function(transcript){
			res.render('soloplay.ejs',{transcription:transcript});
		});
	});

	app.post('/solo/:id*?', isLoggedIn, function(req, res){
		//TODO: Get the id and pass it through, if id is
		//used then save to the transcription. All if there is even an id.
		userc.saveTranscription(req, function(err){
			if(err) throw err;
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