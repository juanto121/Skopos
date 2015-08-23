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

	/*
		TODO: cuando se quite el player global, se puede hacer 2 cosas:
		- Crear 2 listas de subscriptores, una para el eventos que no son ENTER
			y otra para eventos que son teclas y subscribir en singleplayer.js
			los metodos del player que correspondan.
		- Tener una sola lista de subscriptores y al notificar mandar el codigo de 
		la tecla que genero el evento y en la clase player decidir que hacer.
		en ese caso seria bueno que los codigos solo los conozca esta clase haciendo
		que tenga variables "estaticas" que deberia ser solo poner: 
			UserInput.KEY_ENTER = 13;
			que es similar a tener una variable global
	

	*/

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

