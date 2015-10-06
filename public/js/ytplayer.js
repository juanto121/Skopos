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

	player.getVideoId = function(){
		return ytplayer.getVideoData().video_id;
	};

	player.changeVideo = function(videoId){
		
		if(videoId.trim()!==""){
			ytplayer.loadVideoById(videoId,0,"medium");
		}
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

	return Player;
})();

function onYouTubeIframeAPIReady(){
	ytplayer = new YT.Player('player',
		{
			events: {
						'onStateChange': onPlayerStateChange
					}
		});
}

function onPlayerStateChange( event ){
   if (ytplayer.getPlayerState() == 1){
     document.querySelector("#title_video").innerHTML=ytplayer.getVideoData().title;
     ytplayer.pauseVideo();
   }
}