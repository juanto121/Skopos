var SrtFormatter = (function(){

	function SrtFormatter(){
		this.init();
	}

	var formatter = SrtFormatter.prototype;

	formatter.format = function(content){
		content.sort(function(a,b){
			return a.time-b.time;
		});
		console.log(content);
	};

	formatter.init = function(){};

	return SrtFormatter;

})();