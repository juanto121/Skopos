/*SRT specification from http://www.matroska.org/technical/specs/subtitles/srt.html*/
var SrtFormatter = (function(){

	function SrtFormatter(){
		this.init();
	}

	var formatter = SrtFormatter.prototype;

	formatter.format = function(content){
		var output = "";
		content.sort(function(a,b){
			return a.time-b.time;
		});

		//Dummy subtitle for last entry
		content.push({time:content[content.length-1].time + 3.0,text:""});
		
		for(var c = 0; c < content.length-1; c++){
			// 1 number indicating sequence
			output += c+1 + "\n";
			output += formatTime(content[c].time)+"-->"+formatTime(content[c+1].time)+"\n";
			output += content[c].text+"\n\n";
		}

		console.log(output);
		
	};

	formatter.init = function(){};

	//Helpers
	function formatTime(time){
		var hour = (time/3600)>>0;
		var minute = (time/60)>>0;
		var second = time%60;
		return hour+":"+minute+":"+second;
	}

	return SrtFormatter;
})();
