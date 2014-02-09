var MLG = MLG || {};

MLG.Utility = {};
MLG.Utility.textWidth = function(textNode){
	var clone = $(textNode.parentElement).clone().empty();
	clone.text(textNode.nodeValue).css({'visibility':'hidden', 'position':'absolute', 'word-wrap':'normal'}).appendTo($('body'));
	var w = clone.width();
	clone.remove();
	return w;
}
MLG.Utility.textHeight = function(textNode){
	var parentClone = $(textNode.parentElement).clone().empty();
	var text = textNode.nodeValue;
	if (parentClone.get(0).nodeName === 'PRE') {
		text = text.split('\n')[0];
	}
	parentClone.text(text).css({'visibility':'hidden', 'position':'absolute'}).appendTo($('body'));
	var h = parentClone.height();
	parentClone.remove();
	return h;
}
MLG.Utility.splitTextNode = function(textNode){
	var container = $('<span>');
	var chars = textNode.nodeValue.split('');
	$.each(chars, function(i, c){
		var span = $('<span>').text(c);
		container.append(span);
	});
	return container.get(0);
}

MLG.Utility.clone = function(node, ancestors){
	var clone = $(node).clone();
	if (ancestors === -1 || ancestors > 0) {
		var child = clone;
		var parent = node.parentElement;
		while ((parent != null) && ancestors--) {
			var parentClone = $(parent).clone();
			child.appendTo(parentClone);
			child = parent;
			parent = parent.parentElement;
		}
	}
	return clone.get(0);
}

MLG.Utility.getNodePath = function(node){
	var path = '';
	var index = 0;
	var child = node;
	var parent = node.parentNode;
	while ((parent != null) && (parent != undefined)) {
		index = $.inArray(child, parent.childNodes);
		path = '/*[' + index + ']' + path;
		child = parent;
		parent = child.parentNode;
	}
	return path;
}

MLG.Utility.getNode = function(path){
	if (path.length == 0) {
		return null;
	}
	var node = null;
	if (path[0] === '/') {
		node = document;
	}
	var tokens = path.split('/')
	for (var i = 0; i < tokens.length; ++i) {
		if (tokens[i].length > 0) {
			var index = '';
			var token = tokens[i];
			var inIndex = false;
			for (var j = 0; j < token.length; ++j) {
				if (token[j] == ']') {
					break;
				} else if (token[j] == '[') {
					inIndex = true;
				} else if (inIndex) {
					index += token[j];
				}
			}
			node = node.childNodes[index];
		}
	}
	return node;
}
