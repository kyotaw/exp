var MonologueController = (function(){
	var constructor = function(){
	}
	
	constructor.prototype = {
		show : function(evt){
			LogueBox.show(evt);
		},
		hide : function(){
			LogueBox.hide();
		}

	}
	return constructor;
}());
