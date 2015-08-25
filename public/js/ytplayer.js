var player;
var Player = (function(){
	function Player(){
		this.init();
	}
	var player = Player.prototype;
	player.resume = function(){
		alert("ytplayer");
	};
	player.init = function(){
		/* TODO : Check if YT API is already downloaded */
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	};

	player.resume = function(keyCode){
		if(keyCode == 13){
			ytplayer.playVideo();
		}else{
			ytplayer.pauseVideo();
		}
	};

	player.getCurrentTime = function(){
		return ytplayer.getCurrentTime();
	};
	

	player.changeVideo = function(videoId){
		console.log(videoId);
		ytplayer.loadVideoById(videoId,0,"medium");
	};

	

	return Player;
})();

function onYouTubeIframeAPIReady(){
	ytplayer = new YT.Player('player');
}