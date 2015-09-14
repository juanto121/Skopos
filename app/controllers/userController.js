var User			= require('../models/user');
var Transcription	= require('../models/transcription');

exports.saveTranscription = function(req, cb){
	var user			= req.user;
	var transcript		= req.body.data;
	var path			= saveToFs(transcript);
	var transcription	= new Transcription();
	transcription.path		= path+transcription._id;
	transcription.videoId	= "";
	transcription.author	= user._id;
	user.save(function(err){
		if(err) cb(err);
		transcription.save(function(err){
			if(err) cb(err);
			cb();
		});
	});
};

//Helpers

function saveToFs(transcript){
	var path = "temp/files/";
	//TODO write file logic.
	return path;
}