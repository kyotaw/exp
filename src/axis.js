var Axis2;
(function(){
	//dependency
	var graphics = FURO.Game.Graphics;

	//private
	var MARGIN = 20;
	var origin = {
		x : window.innerWidth / 2,
		y : window.innerHeight / 2};
	var scaleX = 10;
	var scaleY = 10;
	var axisDrawer = {};

	function drawAxisX(labelX, maxX, nx, drawer){
		drawer.drawLine(MARGIN, origin.y, window.innerWidth - MARGIN, origin.y);
		dx = maxX / nx;
		for (var i = 0; i <= nx; ++i) {
			var x = Axis2.transX(dx * i);
			drawer.drawLine(x, origin.y - 5, x, origin.y + 5);
			drawer.drawText(dx * i, x, origin.y + 5);
			x = Axis2.transX(-dx * i);
			drawer.drawLine(x, origin.y - 5, x, origin.y + 5);
			drawer.drawText(-dx * i, x, origin.y + 5);
		}
		drawer.drawText(
			labelX,
			Axis2.transX(maxX) - 10,
			origin.y + 20);
	};
	function drawAxisY(labelY, maxY, ny, drawer){
		drawer.drawLine(origin.x, MARGIN, origin.x, window.innerWidth - MARGIN);
		dy = maxY / ny;
		for (var i = 1; i <= ny; ++i) {
			var y = Axis2.transY(dy * i);
			drawer.drawLine(origin.x - 5, y, origin.x + 5, y);
			drawer.drawText(dy * i, origin.x + 5, y);
			y = Axis2.transY(-dy * i);
			drawer.drawLine(origin.x - 5, y, origin.x + 5, y);
			drawer.drawText(-dy * i, origin.x + 5, y);
		}
		drawer.drawText(
			labelY,
			origin.x + 20,
			Axis2.transY(maxY) + 10);
	};

	Axis2 = {
		init : function(labelX, labelY, maxX, nx,  maxY, ny){
			scaleX = (window.innerWidth - MARGIN - origin.x) / maxX;
			scaleY = (window.innerHeight - MARGIN - origin.y) / maxY;
			axisDrawer = graphics.createDrawer(document, 'axis-1');
			drawAxisX(labelX, maxX, nx, axisDrawer);
			drawAxisY(labelY, maxY, ny, axisDrawer);
		},
		transX : function(x){
			return origin.x + (x * scaleX);
		},
		transY : function(y){
			return origin.y - (y * scaleY);
		},
	}
}());

