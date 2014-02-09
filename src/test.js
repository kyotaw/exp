Monologue = (function(){
	var _controller = MLG.MonologueController;

	function createLogueBox(evt){
		_controller.create(evt);
	}

	return {
		begin : function(){
			$("body").bind("mouseup", _controller.create);
			$(window).bind("resize", _controller.relocate);
		},
		end : function(){
			$("body").unbind("mouseup", _controller.create);
			$(window).unbind("resize", _controller.relocate);
			_controller.destroy();
		}
	}

}());
