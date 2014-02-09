var MLG = MLG || {};

MLG.NoteView = (function(){
	var _activeNotes = {};

	function createNoteTag(note) {
		var tag = $('<div>')
			.css({
				'position':'absolute',
				'border':'thin solid #000000',
				'left':note.left + 'px',
				'top':note.top + 'px',
				'background-color' : '#FAFAFA',
				'opacity' : 1
			});
		var span = $('<span>').css({'opacity' : 1}).text(note.text);
		tag.append(span);
		return tag;
	}

	return {
		create : function(note){
			var tag = createNoteTag(note);
			$('body').append(tag);
			_activeNotes[note.id] = tag;
		},
		destroy : function(id){
			_activeNotes[id].remove();
			delete _activeNotes[id];
		}
	}
	

}());
