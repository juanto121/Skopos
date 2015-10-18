var Transcription = require('../models/transcription');

exports.newTranscription = function(){
	var transcript = new Transcription();
	cb(transcript);
};

exports.getTranscriptionById = function(id, cb){
	Transcription
	.findOne({_id:id}, function(err, transcript){
		if(err) console.log("Error while finding the transcription");
		cb(transcript);
	});
};