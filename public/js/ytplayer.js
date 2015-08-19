var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create YouTube player(s) after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
 player = new YT.Player('player');
}

function pauseVideo() {
        player.pauseVideo();
}

 function playVideo() {
        player.playVideo();
 }
