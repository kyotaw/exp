var MLG = MLG || {};

MLG.LogueBoxView = (function(){
	var _showing = false;
	var _box = null;
	var _textarea = null;
	var _button = null;
	var _submitCB = null;

	(function(){
		_box = $("<div>")
			.attr("id", "momo-box")
			.css({"position":"absolute"});
		_textarea = $("<textarea>")
			.attr({"cols":20, "rows":5, "maxlength":200})
			.css("resize", "none")
		_button = $("<div>")
			.addClass("paste-button")
			.append($("<button>Paste</button>")
				.css({"margin-top":"5px", "float":"right"}));
		_box.append(_textarea).append(_button);
	}())
		
	return {
		create : function(x, y, submitCB, data){
			if (_showing) {
				return;
			}
			_submitCB = submitCB;
			_button.bind("click", data, _submitCB);
			_box.css({"left":x + "px", "top":y + "px"});
			$("body").append(_box);
			
			/*keep selection highlight*/
			var sel = window.getSelection();
			var range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
			_textarea.focus();
			if (range != null) {
				sel.addRange(range);
			}
			_showing = true;
		},
		destroy : function(){
			if (!_showing) {
				return;
			}
			_button.unbind('click', _submitCB);
			_textarea.val('');
			_box.remove();
			_submitCB = null;
			_showing = false;
		},
		show : function(){
			_box.show();
		},
		hide : function(){
			_box.hide();
		},
		text : function(){
			if (!_showing) {
				return '';
			}
			return _textarea.val();
		},
		position : function(){
			if (!_showing) {
				return [0, 0];
			}
			var p = _box.offset();
			return [p.left, p.top];
		}
	}
}());
