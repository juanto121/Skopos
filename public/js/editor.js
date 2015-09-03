var Editor = (function(){
	function Editor(){
		this.init();
	}
	var editor = Editor.prototype;
	editor.init = function(){
		this.formatter = new Formatter();
		this.transcription = [];
	};
	editor.addLine = function(keyCode){
		if(keyCode == 13){
			var content  = this.input.textContent;
			if(content.trim() !== ""){
				var seconds = this.player.getCurrentTime();
				var min = (seconds/60)>>0;
				var secs = (seconds%60)>>0;

				this.transcription.push({
					text:content,
					time:seconds
				});

				
				var prevInput = document.createElement("div");
				var inputUser = document.createElement("div");
				var timestamp = document.createElement("div");

				timestamp.className = "timestamp";
				prevInput.className = "text";
				inputUser.className = "transcripcion";

				timestamp.textContent = min + ":" + secs;
				prevInput.textContent = content;

				inputUser.appendChild(timestamp);
				inputUser.appendChild(prevInput);

				this.previn.insertBefore(inputUser,this.previn.childNodes[0]);
				this.input.textContent = "";


				if(this.transcription.length > 5){
					var lastVisibleChild = this.previn.children[4];
					lastVisibleChild.className = lastVisibleChild.className + " hidden";
				}

				fadeIn();
			}
		}
	};
	editor.setInput = function(input){
		this.input = input;
		this.input.textContent = "";
	};
	editor.setHistory = function(prevInput){
		this.previn = prevInput;
	};
	editor.setPlayer = function(player){
		this.player = player;
	};
	editor.downloadFormat = function(){
		return this.formatter.format(this.transcription);
	};

	return Editor;
})();
