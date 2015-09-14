var mongoose			= require('mongoose');

var transcriptionSchema = mongoose.transcriptionSchema({
	path: String,
	videoId: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	creationDate: Date
});

module.exports	= mongoose.model('Transcription', transcriptionSchema);