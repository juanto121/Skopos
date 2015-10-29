var Collab = (function(){
	function Collab(){
		this.init();
	}

	var collab = Collab.prototype;

	collab.init = function(){
		this.userInput = new UserInput();
		this.editor = new Editor();
		this.toolBox = new Tools();
		this.player = new Player();

		this.urlContainer = document.querySelector(".urlContainer");
		this.url = document.querySelector(".url");
		this.edition = document.querySelector(".edition");
		this.input = document.querySelector(".inputContainer");
		this.inputHistory = document.querySelector(".prevInput");
		this.initText = document.querySelector(".placeholder");
		this.videoTitle = document.querySelector("#title_video");
		this.playerElement = document.querySelector('#player');
		this.videoId = document.querySelector('#videoId').innerHTML;
		this.collaborators = document.querySelector('.collaboratorsList');
		this.localProgress = $('.partialProgress');
		this.fraction = 1;
		
		this.player.initVars(this.playerElement, this.videoId, this.videoTitle);
		this.player.addListener(this.playerReady.bind(this));

		this.toolsBoxElement = document.querySelector(".toolbox");
		this.toolBox.setToolbox(this.toolsBoxElement);

		this.toolBox.addSubscriber(this.toolAction.bind(this));
		this.userInput.addSubscriber(this.editor.addLine.bind(this.editor));
		this.userInput.addSubscriber(this.computeLocalProgress.bind(this));
		
		this.userInput.addSubscriber(this.player.resume.bind(this.player));

		this.initText.addEventListener("click", this.setInput.bind(this));

		this.editor.setPlayer(this.player);
		this.editor.setInput(this.input);
		this.editor.setHistory(this.inputHistory);
		this.userInput.bindElement(this.input);
	};

	collab.setInput = function(){
		this.input.textContent = "";
	};

	collab.toolAction = function(notification){
		console.log(notification);
		if(notification.tag == "save"){
			this.computeLocalProgress();
			var transcript = this.editor.downloadFormat();
			if(this.editor.transcription.length){
				var videoId = this.player.getVideoId();
				var titulo =  document.querySelector("#title_video").textContent;

				console.log(titulo);

				$.post(document.location.pathname,{data: transcript, videoId: videoId, title_video: titulo}, function(response){
					//TODO: show message, transcription saved
					console.log("transcription saved?");
				});
			}
		}
	};

	collab.playerReady = function(){
		this.obtainCollabInfo();
	};

	collab.computeLocalProgress = function(){
		var secondsTranscripted = this.editor.getTranscriptedTime();
		var total = this.player.duration;
		this.localProgress.css("width", (secondsTranscripted * 100 / total)*this.fraction + "%");
	};

	collab.obtainCollabInfo = function(){
		var collaboration = this;
		var location = document.location.pathname;
		$.get(location + '/data', function(data){
			var collabInfo = data.collab;
			var userId = data.userId;
			var userIndex = 0;
			for(var i = 0; i < collabInfo.collaborators.length; i++){
				collaboration.addCollaborator(collabInfo.collaborators[i]);
				if(collabInfo.collaborators[i]._id == userId) userIndex = i;
			}
			var videoDuration = collaboration.player.duration;
			var fraction = 1 / collabInfo.collaborators.length;
			collaboration.fraction = fraction;
			collaboration.transcription = data.part;
			collaboration.editor.loadSavedTranscription(collaboration.transcription._id, function(){
				collaboration.computeLocalProgress();
			});
			collaboration.sectionVideo(userIndex, fraction, videoDuration);
			console.log("loading - user index: " + userIndex + " fraction: " + fraction + " duration:" + videoDuration);
		});
	};

	collab.addCollaborator = function(collaborator){
		var collaboratorElement = $('<li class="collaborator">'+collaborator.local.nombre+'</li>');
		this.collaborators.appendChild(collaboratorElement[0]);
	};

	collab.sectionVideo = function(userIndex, fraction, videoDuration){
		var start = userIndex * videoDuration*fraction;
		var end = start + videoDuration * fraction;
		this.player.loadSection(start, end);
	};

	return Collab;
})();

window.onload = function(){
	var Collaboration = new Collab();
};
