var mongoose			= require('mongoose');

var transcriptionSchema = mongoose.Schema({
	path: String,
	videoId: String,
	title_video :String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	creationDate: {type:Date, default: Date.now}
});

module.exports	= mongoose.model('Transcription', transcriptionSchema);