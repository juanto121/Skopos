var Player = (function(){
	function Player(){
		this.init();
	}
	var player = Player.prototype;

	player.init = function(){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var currentPlayer = this;

		window.onYouTubeIframeAPIReady = function(){
			currentPlayer.createPlayer();
		};
	};

	player.initVars = function(playerElement, playerVideoId, playerTitleElement){
		this.playerElement = playerElement;
		this.videoId = playerVideoId;
		this.titleElement = playerTitleElement;
		this.listeners = [];
	};

	player.addListener = function(listener){
		this.listeners.push(listener);
	};

	player.notifyReady = function(){
		for (var i = this.listeners.length - 1; i >= 0; i--) {
			this.listeners[i]();
		}
	};

	player.createPlayer = function(){
		var currentPlayer = this;
		this.youtube = new YT.Player(this.playerElement, {
			events: {
				'onReady': onPlayerReady.bind(currentPlayer),
				'onStateChange': onPlayerStateChange.bind(currentPlayer)
			}
		});
	};

	player.resume = function(keyCode){
		if(keyCode == 13){
			this.youtube.playVideo();
		}else{
			this.youtube.pauseVideo();
		}
	};

	player.getCurrentTime = function(){
		return this.youtube.getCurrentTime();
	};

	player.getVideoId = function(){
		return this.youtube.getVideoData().video_id;
	};

	player.changeVideo = function(videoId){
		
		if(videoId.trim()!=="")
		{
			this.youtube.cueVideoById(videoId);
		}
	};

	player.loadSection = function(start, end){
		this.youtube.loadVideoById({'videoId': this.videoId,
       'startSeconds': start,
       'endSeconds': end,
       'suggestedQuality': 'large'});
	};

	player.parseUrl = function(url){
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		var idVideo = "";
		if (match&&match[7].length==11){
			idVideo = match[7];
		}
		return idVideo;
	};

	player.playVideo = function()
	{
		this.youtube.playVideo();
	};


	function onPlayerReady(event){
		var yt = event.target;
		this.titleElement.innerHTML = yt.getVideoData().title;
		this.duration = yt.getDuration();
		this.youtube = yt;
		this.notifyReady();
	}

	function onPlayerStateChange(event){
		if(event.data){
			switch(event.data){
				case YT.PlayerState.CUED:
				break;
				case YT.PlayerState.PLAYING:
					this.titleElement.innerHTML = this.youtube.getVideoData().title;
				break;
				case YT.PlayerState.PAUSED:
				break;
			}
		}
	}

	return Player;
})();
