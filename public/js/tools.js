var Tools = (function(){
	function Tools(){
		this.init();
	}
	var tools = Tools.prototype;

	tools.init = function(){
		this.subscribers = [];
	};

	tools.setToolbox = function(toolbox){
		var tools = toolbox.querySelectorAll(".tool");
		for(var t in tools){
			tools[t].onclick = this.notify.bind(this);
		}
	};

	tools.notify = function(ev){
		for(var s in this.subscribers){
			this.subscribers[s]({tag:ev.target.id});
		}
	};

	tools.addSubscriber = function(subscriber){
		this.subscribers.push(subscriber);
	};

	return Tools;
})();