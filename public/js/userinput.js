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
			
			//Obtener Player Posicion 1 array.
			player = this.subscribers[1];
			
			if(code == KEY_ENTER){
				//Se realiza un enter
				evt.preventDefault();
				//Se reanuda el video.
				this.notifyEnter();
				fadeIn();
				
			}else
			{
				//Se esta escribiendo en el Input
				//Se pausa el video
				this.notifyWrite();
			}
		}.bind(this);
	};

	ui.addSubscriber = function(subscriber){
		this.subscribers.push(subscriber);
	};

	ui.notifyEnter = function(){
		
		// Ejecutar Función (Array Posicion 1)
		this.subscribers[0]();
		//Llamar metodo play del player del video Actual.
		player.playVideo();

		/*
		this.subscribers.forEach(function(cb){
 			cb();
-
 		});
		*/
	
	};

	ui.notifyWrite = function()
	{
		//Llamar metodo pause del player del video Actual.
		player.pauseVideo();
	};

	return UserInput;
})();

