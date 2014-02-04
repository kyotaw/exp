var Monologue = (function(){


	return {
		begin : function(){
			$("body").mouseup(function(evt){
				LogueBox.show(evt);	
			});
		}



	}

}());

var LogueBox = (function(){
	var showing = false;
		
	return {
		show : function(evt){
			if (showing) {
				return;
			}
			var box = $("<div>")
				.attr("id", "momo-box")
				.css({"position":"absolute", "left":evt.pageX + "px", "top":evt.pageY + "px"})
			var textarea = $("<textarea>")
				.attr({"cols":20, "rows":5, "maxlength":200})
				.css("resize", "none")
			var button = $("<div>")
				.addClass("paste-button")
				.append($("<button>Paste</button>")
					.css({"margin-top":"5px", "float":"right"})
				);

			box.append(textarea).append(button);
			$("body").append(box);
			textarea.focus();
			showing = true;
		}
	}
}());
