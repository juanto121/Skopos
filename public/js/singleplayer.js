var SinglePlayer = (function(){
	function SinglePlayer(){
		sp.init();
	}
	var sp = SinglePlayer.prototype;
	
	sp.init = function(){
		this.userInput = new UserInput();
		this.editor = new Editor();
		this.userInput.addSubscriber(this.editor.addLine);

	};
	return SinglePlayer;
})();

window.onload = function(){
	var SP = new SinglePlayer();
};
