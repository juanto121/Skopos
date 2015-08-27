var SinglePlayer = (function(){
	function SinglePlayer(){
		sp.init();
	}
	var sp = SinglePlayer.prototype;

	sp.init = function(){
		this.userInput = new UserInput();
		this.editor = new Editor();
		this.toolBox = new Tools();
		this.player = new Player();
		this.counter = new CharCounter();

		this.input = document.querySelector(".inputContainer");
		this.inputHistory = document.querySelector(".prevInput");

		this.cpmCounter = document.querySelector("#CPM");
		this.score = document.querySelector("#score");

		this.toolsBoxElement = document.querySelector(".toolbox");
		this.toolBox.setToolbox(this.toolsBoxElement);

		this.toolBox.addSubscriber(this.toolAction.bind(this));
		this.userInput.addSubscriber(this.editor.addLine.bind(this.editor));
		
		this.userInput.addSubscriber(this.player.resume.bind(this.player));
		this.userInput.addSubscriber(this.counter.keyInput.bind(this.counter));

		this.counter.addCounterListener(this.updateScore.bind(this));
		//setInterval(this.counter.keyInput.bind(this.counter),1000);

		this.editor.setPlayer(this.player);
		this.editor.setInput(this.input);
		this.editor.setHistory(this.inputHistory);
		this.userInput.bindElement(this.input);
	};

	sp.toolAction = function(notification){
		if(notification.tag == "download"){
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
		if(notification.tag == "youtube"){
			this.toolsBoxElement.querySelector("#youtube_URL").style.visibility='visible';
			this.toolsBoxElement.querySelector("#youtube").style.visibility='hidden';
		}
		if(notification.tag == "youtube_ingreso"){
			var url = this.toolsBoxElement.querySelector("#url").value;
			this.toolsBoxElement.querySelector("#youtube_URL").style.visibility='hidden';
			this.toolsBoxElement.querySelector("#youtube").style.visibility='visible';
			var idVideo= youtube_parser(url);
			this.player.changeVideo(idVideo);
			document.querySelector(".prevInput").innerHTML="";
		}
	};

	sp.updateScore = function(){
		this.cpmCounter.textContent = (this.counter.getCpm())>>0;
		this.score.textContent = Number(this.score.textContent) + 1;
	};

	return SinglePlayer;
})();

window.onload = function(){
	var SP = new SinglePlayer();
};

