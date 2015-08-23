var KEY_ENTER = 13;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create YouTube player(s) after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
 player = new YT.Player('player');
}

/* Luego de encapsular al player para escuchar el clic en el toolbox:

CLASES que depended de player global: userInput y singlePlayer.

player.changeVideo = function(src){
	if(src == 'youtube'){
		//logica para cambiar el video: https://developers.google.com/youtube/js_api_reference?hl=es#Functions
	}	
};

*/