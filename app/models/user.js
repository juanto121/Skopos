var mongoose	= require('mongoose');
var bcrypt		= require('bcrypt-nodejs');

//TODO: !Urgent: replace nombre to name, idioma to language
var userSchema	= mongoose.Schema({
	local		:{
		email	:String,
		password:String,
		nombre: String,
		idioma: String
	},
	transcriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transcription'}]
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);