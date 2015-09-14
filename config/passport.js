var LocalStrategy		= require('passport-local').Strategy;
var User				= require('../app/models/user');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	/*
	 *   === LOCAL SIGNUP ===
	*/

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},

	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({ 'local.email' : email }, function(err, user) {
				if(err){
					console.log("Error on validation: " + err);
					return done(err);
				}
				if(user){
					return done(null, false, req.flash('signupMessage', 'El email ya está en uso'));
				} else {
					var newUser = new User();

					newUser.local.email		= email;
					newUser.local.password	= newUser.generateHash(password);
					newUser.local.nombre	= "Usuario";
					newUser.local.idioma	= "Español (CO)";

					newUser.save(function(err) {
						if(err)
							throw err;
						console.log("User " + newUser.local.email + " saved.");
						return done(null, newUser);
					});
				}
			});
		});
	}));


	/*
	 *   === LOCAL LOGIN ==
	*/

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		User.findOne({'local.email' : email}, function(err, user){
			
			if(err)
				return done(err);

			if (!user || !user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'No se encontro el usuario/contrasena'));

            return done(null, user);

		});
	}));

};