var User			= require('../models/user');
var Transcription	= require('../models/transcription');

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
		if(err) console.log("Error while getting transcriptions");
		return cb(transcript);
	});
};

//Helpers

function saveToFs(transcript){
	var path = "temp/files/";
	//TODO write file logic.
	return path;
}