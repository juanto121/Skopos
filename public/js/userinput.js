var KEY_ENTER = 13;
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
			if(code == KEY_ENTER){
				evt.preventDefault();
				this.notifyEnter();
				fadeIn();
			}else
			{
				this.notifyInput(code);
			}
		}.bind(this);
	};

	ui.addSubscriber = function(subscriber){
		this.subscribers.push(subscriber);
	};

	ui.notifyEnter = function(){
		/*TODO: player es global*/
		player.playVideo();
		this.subscribers.forEach(function(cb){
			cb();
		});
	};

	ui.notifyInput = function(keyCode){
		/*TODO: player es global*/
		player.pauseVideo();
	};


	return UserInput;
})();

