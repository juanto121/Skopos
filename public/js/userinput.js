var player;
var UserInput = (function(){
	
	function UserInput(){
		this.init();
	}
	var ui = UserInput.prototype;

	ui.init = function(){

		/*Variables*/
		this.subscribers = [];

	};

	ui.bindElement = function(element){
		element.onkeydown = function(evt){
			var code = evt.keyCode;
			if(code == 13) evt.preventDefault();
			this.notifyInput(code);
		}.bind(this);
	};

	ui.addSubscriber = function(subscriber){
		this.subscribers.push(subscriber);
	};

	ui.notifyInput = function(keyCode){
		this.subscribers.forEach(function(cb){
			cb(keyCode);
		});
	};

	return UserInput;
})();

