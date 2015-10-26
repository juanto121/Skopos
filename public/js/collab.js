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

		this.player.initVars(this.playerElement, this.videoId, this.videoTitle);
		this.player.addListener(this.playerReady.bind(this));

		this.toolsBoxElement = document.querySelector(".toolbox");
		this.toolBox.setToolbox(this.toolsBoxElement);

		this.toolBox.addSubscriber(this.toolAction.bind(this));
		this.userInput.addSubscriber(this.editor.addLine.bind(this.editor));
		
		this.userInput.addSubscriber(this.player.resume.bind(this.player));

		this.editor.setPlayer(this.player);
		this.editor.setInput(this.input);
		this.editor.setHistory(this.inputHistory);
		this.userInput.bindElement(this.input);
	};

	collab.toolAction = function(){

	};

	collab.playerReady = function(){
		this.obtainCollabInfo();
	};

	collab.obtainCollabInfo = function(){
		var collaboration = this;
		var location = document.location.pathname;
		$.get(location + '/data', function(data){
			var collabInfo = data.collab;
			var userId = data.userId;
			var userIndex = collabInfo.collaborators.indexOf(userId);
			var videoDuration = collaboration.player.duration;
			var fraction = 1 / collabInfo.collaborators.length;
			collaboration.sectionVideo(userIndex, fraction, videoDuration);
		});
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
