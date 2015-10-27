var User			= require('../models/user');
var Transcription	= require('../models/transcription');
var fileSave		= require('file-save');
var Collab	= require('../models/collab');

exports.updateUserInfo = function(req, cb) {
	var user = req.user;
	var nombre	= req.body.nombre;
	var email	= req.body.email;
	var idioma	= req.body.idioma;

	user.local.nombre	= nombre;
	user.local.email	= email;
	user.local.idioma	= idioma;

	user.save(function(err){
		if(err) cb(err);
		cb();
	});
};

exports.newTranscription = function(req, cb){
	var transcription = new Transcription();
	cb(transcription);
};

exports.saveTranscription = function(req, cb){
	var user			= req.user;
	var titulo          = req.body.title_video;
	var transcript		= req.body.data;
	var videoId			= req.body.videoId;
	var transcription	= new Transcription();
	transcription.path		= "public/temp/files/"+transcription._id+".srt";
	transcription.videoId	= videoId;
	transcription.author	= user._id;
	transcription.title_video	= titulo;
	
	transcription.save(function(err){
		if(err) cb(err);

		console.log(transcription.path);
		console.log(transcript);

		fileSave(transcription.path)
		.write(transcript, 'utf-8')
		.end();
	});
	
	user.transcriptions.push(transcription);

	user.save(cb);
};

exports.getTranscriptions = function(req, cb){
	var user = req.user;
	Transcription
	.find({author : user._id})
	.exec(function(err, transcript){
		/*TODO: Replace with flash message*/
		if(err) console.log("Error while getting transcriptions");
		return cb(transcript);
	});
};

exports.getCollabsUser = function(req, cb){
	var user = req.user;
	Collab
	.find({author : user._id})
	.exec(function(err, collaboration){
		/*TODO: Replace with flash message*/
		if(err) console.log("Error while getting collaborations");
		return cb(collaboration);
	});
};

//TODO: getTranscriptionById belongs to a transcription controller
exports.getTranscriptionById = function(id, cb){
	Transcription
	.findOne({_id:id},function(err, transcript){
		/*TODO: Replace with flash message*/
		if(err) console.log("Error while finding a transcription");
		cb(transcript);
	});
};
