var CharCounter = (function(){
	function CharCounter(){
		this.init();
	}
	var counter = CharCounter.prototype;

	counter.init = function(){
		this.counterListeners = [];
		this.timeLastKeyStroke = 0;
		this.timer = null;
		this.charCounter = 0;
		this.cpm = 0;
		this.wpm = 0;
	};

	counter.keyInput = function(keyCode){
		if(keyCode!==13 && keyCode !== 8){
			if(this.timeLastKeyStroke === 0){
				this.timeLastKeyStroke = new Date().getTime();
			}else{
				this.charCounter ++;
				var currentTime = new Date().getTime();
				this.cpm = 60000/ ((currentTime-this.timeLastKeyStroke));
				this.timeLastKeyStroke = currentTime;
				this.wpm = this.cpm/5;
				
				for(var listener in this.counterListeners){
					this.counterListeners[listener]();
				}
			}
		}else{
			this.timeLastKeyStroke = 0;
			this.charCounter = 0;
		}
	};

	counter.getCharCounter = function(){
		return this.charCounter;
	};

	counter.getCpm = function(){
		return this.cpm;
	};

	counter.getWpm = function(){
		return this.wpm;
	};

	counter.addCounterListener = function(listener){
		this.counterListeners.push(listener);
	};

	return CharCounter;
})();