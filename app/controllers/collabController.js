var Collab	= require('../models/collab');
var Transcription = require('../controllers/transcriptionController');

exports.newCollab = function(req, cb){
	var data = req.body;

	var collab = new Collab();

	var videoId = parseUrl(data.videoId);
	var author = req.user._id;

	collab.videoId = videoId;
	collab.author = author;
	collab.collaborators = [];
	collab.parts = [];

	collab.save(function(err){
		if(err) cb(err);
		cb(collab);
	});
};

exports.saveCollab = function(req, cb){
	var collabc = this;
	var collabId = req.params.id;
	var user = req.user;
	
	var transInfo = req.body.data;
	var videoId = req.body.videoId;
	var title = req.body.title_video;

	console.log(req.body);
	//TODO : Change the for loop with a proper mongoose atomic/async query
	Collab.findOne({_id:collabId}).populate({
		path:'parts'
	}).exec(function(err, collab){
		var found = false;
		collabc.findPartByUserInCollab(user._id, collab, function(found){
			if(found){
				Transcription.saveTranscription(found, transInfo, function(updated){
					console.log("Updated transcription succesfully");
					cb();
				});
			}else{
				Transcription.newTranscription(function(trans){
					trans.path = "public/temp/files/" + trans._id + ".srt";
					trans.author = user._id;
					trans.videoId = videoId;
					trans.title_video = title;
					Transcription.saveTranscription(trans, transInfo, function(transc){
							console.log("Added new part to collab " + transc);
							collab.parts.addToSet(transc._id);
							collab.save(cb);
					});
				});
			}
		});
	});
};

exports.findPartByUserInCollab = function(idUser, collab, cb){
	var found = false;
	console.log(collab);
	for (var i = collab.parts.length - 1; i >= 0; i--) {
			console.log(collab.parts[i].author + " <--> " + idUser);
			if(collab.parts[i].author+"" === idUser+""){
				found = collab.parts[i];
				cb(found);
				return;
			}
	}
	cb(found);
};

exports.populateCollab = function(collabId, cb){
	Collab.findOne({_id:collabId}).populate([{path:'parts'},{path:'collaborators'}]).exec(cb);
};

exports.getCollaborators = function(collabId, cb){
	Collab.findOne({_id:collabId}).populate({path:'collaborators'}).exec(function(err, collab){
		if(err) console.log("Error while finding collaborators");
		else{
			cb(collab.collaborators);
		}
	});
};

exports.findCollabById = function(id, cb){
	Collab
	.findOne({_id:id}, function(err, collaboration){
		if(err) console.log("Couldnt find a collaboration with id: " + id);
		console.log(collaboration);
		cb(collaboration);
	});
};

exports.addCollaborator = function(collabId, userId, cb){
	this.findCollabById(collabId, function(collab){
		if(collab){
		console.log("Adding collaborator with id: " + userId);
		collab.collaborators.addToSet(userId);
		collab.save(cb(collab));
		}else{
			cb(false);
		}
	});
};

exports.getCollabs = function(req, cb){
	Collab
	.find()
	.exec(function(err, collaboration){
		/*TODO: Replace with flash message*/
		if(err) console.log("Error while getting collabs");
		return cb(collaboration);
	});
};

//helpers

function parseUrl(url){
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	var idVideo = "";
	if (match&&match[7].length==11){
		idVideo = match[7];
	}
	return idVideo;
}
