var MLG = MLG || {};

MLG.Note = (function(){

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
	function preFormatted(textNode){
		var parent = textNode.parentElement;
		while (parent != null &&
			   parent.nodeName != 'BODY' &&
			   parent.nodeName != 'HTML') {
			
			if (parent.nodeName == 'PRE') {
				return true;
			}
			parent = parent.parentElement;
		}
		return false;
	}
	function calcTextHeight(textNode, preFormatted){
		var height = MLG.Utility.textHeight(textNode);
		if (preFormatted) {
			var lines = textNode.nodeValue.split('\n');
			var lineCount = lines.length;
			var brCount = 0;
			$.each(lines, function(i, line){
				line = $.trim(line);
				if (brCount == 1 && line != '') {
					--lineCount;
					brCount = 0;
				}
				if (line == '') {
					++brCount;
				}
			});
			if (brCount == 1) {
				--lineCount;
			}
			height *= lineCount;
		}
		return height;
	}

	function left(boxLeft){
		if (!anySelected()) {
			return boxLeft;
		}
		var selection = window.getSelection();
		var node = selection.focusNode;
		if (node.nodeType === Node.TEXT_NODE) {
			var parentNode = node.parentNode;
			var focusOffset = selection.focusOffset;
			var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
			var startContainer = range.startContainer;
			var startOffset = range.startOffset;
			var endContainer = range.endContainer;
			var endOffset = range.endOffset;
			
			var spanContainer = MLG.Utility.splitTextNode(node);
			node.parentNode.replaceChild(spanContainer, node);
			var lastChar = $(spanContainer.childNodes[focusOffset - 1]);
			var offset = lastChar.offset().left;
			parentNode.replaceChild(node, spanContainer);
			if (range != null) {
				range.setStart(startContainer, startOffset);
				range.setEnd(endContainer, endOffset);
			}
			return offset;
			/*
			var start = (selection.anchorNode == selection.focusNode) ? selection.anchorOffset : selection.focusOffset;
			var end = selection.focusOffset;
			var clone = MLG.Utility.clone(node, 1);
			clone.nodeValue = clone.nodeValue.substring(0, end);
			if (preFormatted(node)) {
				var lines = clone.nodeValue.split('\n');
				clone.nodeValue = lines[lines.length - 1];
			}
			var offset = MLG.Utility.textWidth(clone);

			$.each(node.parentElement.childNodes, function(index, child){
				if (child == node) {
					return false;
				}
				if (child.nodeType === Node.TEXT_NODE) {
					offset += MLG.Utility.textWidth(child);
				} else {
					if ($(child).css('display') != 'block') {
						offset += $(child).width();
					}
				}
			});
			*/
		} else {
			return boxLeft;
		}
	}
	function top(boxTop){
		if (!anySelected()) {
			return boxTop;
		}
		var selection = window.getSelection();
		var node = selection.focusNode;
		if (node.nodeType === Node.TEXT_NODE) {
			var focusOffset = selection.focusOffset;
			var parentNode = node.parentNode;
			var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
			var startContainer = range.startContainer;
			var startOffset = range.startOffset;
			var endContainer = range.endContainer;
			var endOffset = range.endOffset;
			
			var spanContainer = MLG.Utility.splitTextNode(node);
			node.parentNode.replaceChild(spanContainer, node);
			var lastChar = $(spanContainer.childNodes[focusOffset - 1]);
			var offset = lastChar.offset().top + lastChar.height();
			parentNode.replaceChild(node, spanContainer);
			if (range != null) {
				range.setStart(startContainer, startOffset);
				range.setEnd(endContainer, endOffset);
			}
			return offset;
			/*
			var clone = MLG.Utility.clone(node, 1);
			var formatted = preFormatted(node);
			if (formatted) {
				clone.nodeValue = clone.nodeValue.substring(0, selection.focusOffset);
			}
			var offset = calcTextHeight(clone, formatted);
		
			$.each(node.parentElement.childNodes, function(index, child){
				if (child == node) {
					return false;
				}
				var childFormatted = formatted || (child.nodeName === 'PRE');
				if (child.nodeType === Node.TEXT_NODE) {
					offset += calcTextHeight(child, formatted);
				} else {
					if ($(child).css('display') === 'block' ||
						(childFormatted && $(child).text() != '')) {
						
						offset += $(child).height();
					}
				}
			});
			*/
		} else {
			return boxTop;
		}
	}
	
	var constructor = function(attrs){
		this.id = attrs.id || 0;
		this.text = attrs.text || '';
		this.left = left(attrs.boxLeft);
		this.top = top(attrs.boxTop);
	}

	constructor.prototype = {
	}

	return constructor;
}());
