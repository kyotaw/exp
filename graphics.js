var Drawer = (function(){
	//private
		
	//public
	var constructer = function(canvasElem){
		this.canvas = canvasElem;
		this.context = canvasElem.getContext('2d');
	};

	constructer.prototype = {
		curX : 0,
		curY : 0,
		curW : 0,
		curH : 0,
		
		drawLine : function(fromX, fromY, toX, toY){
			this.context.save();
			this.context.beginPath();
			this.context.moveTo(fromX, fromY);
			this.context.lineTo(toX, toY);
			this.context.stroke();
			this.context.restore();
		},
		drawStrokeRect : function(x, y, w, h){
			this.context.save();
			this.context.strokeRect(x, y, w, h);
			this.context.restore();
		},
		drawCircle : function(x, y, r){
			this.context.save();
			this.context.beginPath();
			this.context.arc(x, y, r, 0, Math.PI * 2, false);
			this.context.fill();
			this.context.restore();
		},
		drawText : function(text, x, y) {
			this.context.save();
			this.context.font = "10px 'MS ゴシック'";
			this.context.textAlign = "left";
			this.context.textBaseline = "top";
			this.context.fillText(text, x, y, 100);
			this.context.restore();
		},
		erase : function(x, y, w, h){
			this.context.clearRect(x, y, w, h);
		},			
		clear : function(){
			this.context.clearRect(this.curX, this.curY, this.curW, this.curH);
		},
		resize : function(x, y, w, h){
			if (x !== this.curX) {
				this.canvas.style.left = x + 'px';
				this.curX = x;
			}
			if (y !== this.curY) {
				this.canvas.style.top = y + 'px';
				this.curY = top;
			}
			if (w !== this.curW) {
				this.canvas.setAttribute('width', w, '');
				this.curW = w;
			}
			if (h !== this.curH) {
				this.canvas.setAttribute('height', h, '');
				this.curH = h;
			}
		}
	};

	return constructer;
}());

FURO.Game.Graphics = (function(){
	//private
	var drawers = {};

	//public
	return {
		createDrawer : function(doc, id){
			if (drawers[id]) {
				return drawers[id];
			}
			var canvas = doc.createElement('canvas');
			canvas.style.zIndex = '5';
			canvas.style.position = 'absolute';
			canvas.style.left = '0px';
			canvas.style.top = '0px';
			canvas.setAttribute('width', window.innerWidth, '');
			canvas.setAttribute('height', window.innerHeight, '');
			canvas.setAttribute('id', id, '');
			var body = doc.getElementsByTagName('body').item(0);
			body.insertBefore(canvas, body.firstChild);
			var drawer = new Drawer(canvas);
			drawers[id] = drawer;
			return drawer;
		},
		destroyDrawer : function(doc, id){
			if (drawers[id] === 'undefined') {
				delete drawers.id;
				return;
			}
			var drawer = drawers[id];
			if (drawer.canvas === 'undefined') {
				delete drawers.id;
				return;
			}
			var body = doc.getElementsByTagName('body').item(0);
			body.removeChild(drawer.canvas);
			delete drawers.id;
		},
		getDrawer : function(id){
			return drawers[id] !== 'undefined' ? drawers[id] : null;
		},
		clear : function(){
			for (id in drawers) {
				if (drawers[id].clear) {
					drawers[id].clear();
				}
			}
		},
		finalize : function(doc){
			for (id in drawers) {
				destryoDrawer(doc, id);
			}
		}
	};
}());

