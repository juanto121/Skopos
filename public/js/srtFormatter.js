/*SRT specification from http://www.matroska.org/technical/specs/subtitles/srt.html*/
var SrtFormatter = (function(){

	function SrtFormatter(){
		this.init();
	}

	var formatter = SrtFormatter.prototype;

	formatter.deformat = function(content){
		var lines = content.split("\n");
		var len = lines.length;
		var entries = [];
		for(var i = 0; i + 4 <= len; i+=4){
			var index = lines[i];
			var timestamp = lines[i+1];
			var data = lines[i+2];
			var startTime = deformatTime(timestamp);
			var entry ={
				time: startTime,
				text: data
			};
			entries.push(entry);
		}
		return entries;
	};

	formatter.format = function(content){
		/*TODO: check if content is still the same*/
		var output = "";
		content.sort(function(a,b){
			return a.time-b.time;
		});

		//Dummy subtitle for last entry adds three seconds to it.
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
		var minute = ((time-hour*3600)/60)>>0;
		var second = (time+0.001)%60.0;
		return padding(hour)+":"+padding(minute)+":"+(padding(second)+"").substring(0,6).replace(".",",");
	}

	function deformatTime(stamp){
		var parts = stamp.split(" --> ");
		var start = parts[0].split(":");
		var hour = Number(start[0]*3600);
		var minute = Number(start[1]*60);
		var second = Number(start[2].split(",")[0]);
		return hour + minute + second;
	};

	function padding(time){
		return time<10?"0"+time:time;
	}

	return SrtFormatter;
})();
