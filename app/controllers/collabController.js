var Collab	= require('../models/collab');

exports.newCollab = function(req, cb){
	var data = req.body;

	var collab = new Collab();

	var videoId = data.videoId;
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