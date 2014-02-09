var MLG = MLG || {};

MLG.MonologueController = (function(){
	var LogueBoxView = MLG.LogueBoxView;
	var Note = MLG.Note;
	var NoteView = MLG.NoteView;

	var _notes = [];
	
	function anySelected(){
		var selection = window.getSelection();
		if (selection.rangeCount <= 0) {
			return false;
		}
		if (selection.isCollapsed) {
			return false;
		}
		var a = selection.getRangeAt(0);
		if (selection.getRangeAt(0).collapsed) {
			return false;
		}
		return true;
	}
	function getNoteAttrs(){
		var noteAttrs = {};
		noteAttrs.id = _notes.length;
		noteAttrs.text = LogueBoxView.text();
		if (anySelected()) {
			noteAttrs.selectedRange = window.getSelection().getRangeAt(0);		
		} else {
			var p = LogueBoxView.position();
			left = p[0];
			top = p[1];
		}
		return noteAttrs;
	}

	(function constructor(){
	}());

	return {
		create : function(evt){
			LogueBoxView.create(evt.pageX, evt.pageY, MLG.MonologueController.paste);
		},
		destroy : function(){
			LogueBoxView.destroy();
		},
		show : function(){
			LogueBoxView.show();
		},
		hide : function(){
			LogueBoxView.hide();
		},
		paste : function(){
			var note = new Note(getNoteAttrs());	
			NoteView.create(note);
			_notes.push(note);
			LogueBoxView.destroy();
		},
		relocate : function(){
			$.each(_notes, function(i, note){
				note.relocate();
				NoteView.update(note);
			});
		}

	}
}());
