Monologue = (function(){
	_monologueCtrl = null;

	function createLogueBox(evt){
		_monologueCtrl = new MonologueController();
		_monologueCtrl.show(evt);
	}

	return {
		begin : function(){
			$("body").bind("mouseup", createLogueBox);
		},
		end : function(){
			$("body").unbind("mouseup", createLogueBox);
			_monologueCtrl.hide();
			_monologueCtrl = null;
		}
	}

}());
