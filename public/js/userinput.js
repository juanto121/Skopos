var KEY_ENTER = 13;
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
			if(code == KEY_ENTER){
				evt.preventDefault();
				this.notify();
				fadeIn();
				
			}
		}.bind(this);
	};

	ui.addSubscriber = function(subscriber){
		this.subscribers.push(subscriber);
	};

	ui.notify = function(){
		this.subscribers.forEach(function(cb){
			cb();

		});
	};

	return UserInput;
})();
