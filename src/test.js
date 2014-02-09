Monologue = (function(){
	var _controller = MLG.MonologueController;

	function createLogueBox(evt){
		_controller.create(evt);
	}

	return {
		begin : function(){
			$("body").bind("mouseup", createLogueBox);
		},
		end : function(){
			$("body").unbind("mouseup", createLogueBox);
			_controller.destroy();
		}
	}

}());
