var Collab	= require('../models/collab');

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
	cb();
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
		console.log("Adding collaborator with id: " + userId);
		collab.collaborators.addToSet(userId);
		collab.save(cb(collab));
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