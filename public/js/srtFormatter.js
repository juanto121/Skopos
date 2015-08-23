/*SRT specification from http://www.matroska.org/technical/specs/subtitles/srt.html*/
var SrtFormatter = (function(){

	function SrtFormatter(){
		this.init();
	}

	var formatter = SrtFormatter.prototype;

	formatter.format = function(content){
		/*TODO: check if content is still the same*/
		var output = "";
		content.sort(function(a,b){
			return a.time-b.time;
		});

		//Dummy subtitle for last entry
		if(content[content.length-1].text!=="")
		content.push({time:content[content.length-1].time + 3.0,text:""});
		
		for(var c = 0; c < content.length-1; c++){
			// 1 number indicating sequence
			output += c+1 + "\n";
			output += formatTime(content[c].time)+" --> "+formatTime(content[c+1].time)+"\n";
			output += content[c].text+"\n\n";
		}
		return output;
	};

	formatter.init = function(){};

	//Helpers
	function formatTime(time){
		var hour = (time/3600)>>0;
		var minute = (time/60)>>0;
		var second = (time+0.001)%60.0;
		return padding(hour)+":"+padding(minute)+":"+(padding(second)+"").substring(0,6).replace(".",",");
	}

	function padding(time){
		return time<10?"0"+time:time;
	}

	return SrtFormatter;
})();
