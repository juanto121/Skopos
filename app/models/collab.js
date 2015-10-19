var mongoose	= require('mongoose');

var collabSchema = mongoose.Schema({
 videoId:String,
 author:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
 collaborators:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
 parts:[{type:mongoose.Schema.Types.ObjectId, ref:'Transcription'}]
});

module.exports = mongoose.model('Collab', collabSchema);