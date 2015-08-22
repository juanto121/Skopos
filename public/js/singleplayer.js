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
		
		this.userInput.addSubscriber(this.editor.addLine.bind(this.editor));
		/*TODO: encapsular player y agregarlo correctamente como subscriptor*/
		this.player = player;
		//this.userInput.addSubscriber(this.player.userAction(this.player));

		this.editor.setPlayer(this.player);
		this.editor.setInput(this.input);
		this.editor.setHistory(this.inputHistory);
		this.userInput.bindElement(this.input);
	};
    
	return SinglePlayer;
})();

window.onload = function(){
	var SP = new SinglePlayer();
};
