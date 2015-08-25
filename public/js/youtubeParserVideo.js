function youtube_parser(url){
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match&&match[7].length==11){
	    var idVideo=match[7];
	}else{
	    console.log("Url incorrecta");
	}
	return idVideo;
}
