var Formatter = (function(){
	function Formatter(){
		this.init();
	}
	var formatter = Formatter.prototype;

	formatter.init = function(){
		this.formatterType = new SrtFormatter();
	};

	formatter.format = function(){
		this.formatterType.format();
	};

	formatter.setFormatterType = function(formatterType){
		this.formatterType = formatterType;
	};

	return Formatter;
})();