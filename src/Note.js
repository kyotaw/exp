var MLG = MLG || {};

MLG.Note = (function(){

	function load(){
		var startNode = MLG.Utility.getNode(this.startNodePath);
		var endNode = MLG.Utility.getNode(this.endNodePath);
		var range = document.createRange();
	}

	function getPosition(range){
		var node = range.endContainer;
		if (node.nodeType === Node.TEXT_NODE) {
			var parentNode = node.parentNode;
			var startContainer = range.startContainer;
			var startOffset = range.startOffset;
			var endContainer = range.endContainer;
			var endOffset = range.endOffset;
			
			var spanContainer = MLG.Utility.splitTextNode(node);
			node.parentNode.replaceChild(spanContainer, node);
			var lastChar = $(spanContainer.childNodes[endOffset - 1]);
			var left = lastChar.offset().left;
			var top = lastChar.offset().top + lastChar.height();
			parentNode.replaceChild(node, spanContainer);
			if (range != null) {
				range.setStart(startContainer, startOffset);
				range.setEnd(endContainer, endOffset);
			}
			return [left, top];
		} else {
			return [0, 0];
		}
	}
	
	var constructor = function(attrs){
		this.id = attrs.id || 0;
		this.text = attrs.text || '';
		if (attrs.left != undefined && attrs.top != undefined) {
			this.left = attrs.left;
			this.top = attrs.top;
			this.fixed = true;
		} else if (attrs.selectedRange != undefined) {
			var p = getPosition(attrs.selectedRange);
			this.left = p[0];
			this.top = p[1];
			this.fixed = false;	
		} else {
			this.left = 0;
			this.top = 0;
			this.fixed = true;
		}
		if (attrs.selectedRange != undefined) {
			var range = attrs.selectedRange;
			this.startNode = range.startContainer;
			this.startNodePath = MLG.Utility.getNodePath(range.startContainer);
			this.startTextOffset = range.startOffset;
			this.endNode = range.endContainer;
			this.endNodePath = MLG.Utility.getNodePath(range.endContainer);
			this.endTextOffset = range.endOffset;
		}
	}

	constructor.prototype = {
		relocate : function(){
			if (this.fixed) {
				return;
			}
			var range = document.createRange();
			range.selectNode(this.endNode);
			range.insertNode(this.startNode);
			range.setStart(this.startNode, this.startTextOffset);
			range.setEnd(this.endNode, this.endTextOffset);
			var p = getPosition(range);
			this.left = p[0];
			this.top = p[1];
		}
	}

	return constructor;
}());
