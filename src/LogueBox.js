var LogueBox = (function(){
	var _showing = false;
	var _box = null;
	var _textarea = null;
	var _button = null;

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
		show : function(evt){
			if (_showing) {
				return;
			}
			_box.css({"left":evt.pageX + "px", "top":evt.pageY + "px"});
			$("body").append(_box);
			
			/*keep selection highlight*/
			var sel = window.getSelection();
			var range = sel.rangeCount > 0 ? sel.getRangeAt(0) : undefined;
			_textarea.focus();
			if (range != undefined) {
				sel.addRange(range);
			}
			_showing = true;
		},
		hide : function(){
			if (!_showing) {
				return;
			}
			_box.remove();
			_showing = false;
		}
	}
}());
