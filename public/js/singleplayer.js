var SinglePlayer = (function(){
	function SinglePlayer(){
		sp.init();
	}
	var sp = SinglePlayer.prototype;

	sp.init = function(){
		this.userInput = new UserInput();
		this.editor = new Editor();
		this.toolBox = new Tools();

		this.input = document.querySelector(".inputContainer");
		this.inputHistory = document.querySelector(".prevInput");

		this.toolsBoxElement = document.querySelector(".toolbox");
		this.toolBox.setToolbox(this.toolsBoxElement);

		this.toolBox.addSubscriber(this.toolAction.bind(this));
		this.userInput.addSubscriber(this.editor.addLine.bind(this.editor));
		/*TODO: encapsular player y agregarlo correctamente como subscriptor*/
		this.player = player;
		//this.userInput.addSubscriber(this.player.userAction(this.player));

		this.editor.setPlayer(this.player);
		this.editor.setInput(this.input);
		this.editor.setHistory(this.inputHistory);
		this.userInput.bindElement(this.input);
	};

	sp.toolAction = function(src){
		if(src == "download"){
			var data = this.editor.downloadFormat();
			$.post("solo",{data:data,name:"filename2.srt"},function(response){
				var iframe;
				iframe = document.getElementById("download-container");
				if (iframe === null)
				{
					iframe = document.createElement('iframe');
					iframe.id = "download-container";
					iframe.style.visibility = 'hidden';
					document.body.appendChild(iframe);
				}
				iframe.src = response;
				});
		}
	};

	sp.inputAction = function(){
		/*
			Handle user input HERE.
		*/
	};

	return SinglePlayer;
})();

window.onload = function(){
	var SP = new SinglePlayer();
};
