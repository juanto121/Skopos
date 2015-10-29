var Transcription = require('../models/transcription');
var fileSave		= require('file-save');

exports.newTranscription = function(cb){
	var transcript = new Transcription();
	cb(transcript);
};

exports.saveTranscription = function(transcription, transcript, cb){
	console.log("transcriptionController:saveTranscription :");
	console.log(transcription.path);
	console.log(transcript);
	fileSave(transcription.path)
		.write(transcript, 'utf-8')
		.end(function(err){
			if (err) throw err;
			transcription.save(cb(transcription));
		});
};

exports.getTranscriptionById = function(id, cb){
	Transcription
	.findOne({_id:id}, function(err, transcript){
		if(err) console.log("Error while finding the transcription");
		cb(transcript);
	});
};
