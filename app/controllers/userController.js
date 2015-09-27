var User			= require('../models/user');
var Transcription	= require('../models/transcription');

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
	var path			= saveToFs(transcript);
	var transcription	= new Transcription();
	transcription.path		= path+transcription._id;
	transcription.videoId	= videoId;
	transcription.author	= user._id;
	transcription.title_video	= titulo;
	
	//TODO: is cb calling itself twice?

	transcription.save(function(err){
		if(err) cb(err);
		cb();
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

//TODO: getTranscriptionById belongs to a transcription controller
exports.getTranscriptionById = function(id, cb){
	Transcription
	.findOne({_id:id},function(err, transcript){
		/*TODO: Replace with flash message*/
		if(err) console.log("Error while finding a transcription");
		cb(transcript);
	});
};

//Helpers

function saveToFs(transcript){
	var path = "temp/files/";
	//TODO write file logic.
	return path;
}