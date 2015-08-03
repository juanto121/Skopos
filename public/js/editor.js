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
			console.log(this.player.getCurrentTime() + " " +content);
			var prevInput = document.createElement("div");

			var timestamp = document.createElement("span");
			timestamp.className = "timestamp";
			timestamp.textContent = this.player.getCurrentTime();

			prevInput.textContent = content;

			this.previn.appendChild(timestamp);
			this.previn.appendChild(prevInput);
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
