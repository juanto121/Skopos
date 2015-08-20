var KEY_ENTER = 13;
var Editor = (function(){
	function Editor(){
		this.init();
	}
	var editor = Editor.prototype;
	editor.init = function(){
		
	};
	editor.addLine = function(){
		var content  = this.input.textContent;
		if(content.trim() !== ""){
			/*TODO : this.player es GLOBAL*/
			var seconds = this.player.getCurrentTime();
			var min = (seconds/60)>>0;
			var secs = (seconds%60)>>0;
			console.log(this.player.getCurrentTime() + " " +content);
			var prevInput = document.createElement("div");
			var inputUser = document.createElement("div");

			var timestamp = document.createElement("div");
			timestamp.className = "timestamp";
			prevInput.className = "text";
			timestamp.textContent = min + ":" + secs;
			prevInput.textContent = content;
			inputUser.className = "transcripcion";

			inputUser.appendChild(timestamp);
			inputUser.appendChild(prevInput);

			this.previn.appendChild(inputUser);
			this.input.textContent = "";
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
	return Editor;
})();
