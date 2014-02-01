var a = true;

var update = function(){
	if(a){
		$(".text").text("aaaaaaaaaaaaaaaaaaaaaaa");
		a = false;
	} else {
		$(".text").text("bbbbbbbbbbbbbbb");
		a = true;
	}
}
var preUpdate = function(){
	$("#frameRate").text("FrameRate: " + QFrameRate.value());
}
var start = function(){
	if (run) {
		return;
	}
	QLoop.start(
		{
			start : function(){$("#start").text("Running");},
			update : update,
			preUpdate : preUpdate,
		}
	);
	run = true;
}

var run = false;
var stop = function(){
	if (!run) {
		return;
	}
	QLoop.stop(function(){
		$("#start").text("Start");
		$("#pause").text("Pause");
	});
	run = false;
}

var pausing = false;
var pause = function(){
	if (pausing) {
		$("#pause").text("Pause");
		QLoop.pause(false);
		pausing = false;
	} else {
		QLoop.pause(true, function(){
			$("#pause").text("Pausing");
		});
		pausing = true;
	}
}

