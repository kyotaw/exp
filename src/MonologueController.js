var MLG = MLG || {};

MLG.MonologueController = (function(){
	var LogueBoxView = MLG.LogueBoxView;
	var Note = MLG.Note;
	var NoteView = MLG.NoteView;

	var _notes = [];

	(function constructor(){
	}());

	return {
		create : function(evt){
			LogueBoxView.create(evt.pageX, evt.pageY, this.paste);
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
			var p = LogueBoxView.position();
			var note = new Note({
				id : _notes.length,
				text : LogueBoxView.text(),
				boxLeft : p[0],
				boxTop : p[1]
			});	
			NoteView.create(note);
			_notes.push(note);
			LogueBoxView.destroy();
		}

	}
}());
