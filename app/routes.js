var fs	= require('fs');

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
		res.render('profile.ejs', {
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/solo', function(req,res) {
			res.render('soloplay.ejs');
	});

	app.post('/solo', function(req, res){
		// name passed in post: req.body.name
		var filePath = __dirname + "file.srt";
		fs.writeFile(filePath, req.body.data, function(err){
			if(err) throw err;
			res.writeHead(200,{'content-type':'application/x-subrip'});
			//TODO : return file url.
			res.end();
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