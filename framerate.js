var FrameRate = new Object
FrameRate.idealValue = 0;
FrameRate.actualValue = 0;
FrameRate.prevFrameTime = 0;
FrameRate.prevInterval = 0;
FrameRate.timeHistory = new Array(10);
FrameRate.frameInterval = 0;

FrameRate.initialize = function(){
	this.idealValue = 0;
	this.actualValue = 0;
	this.frameInterval = 0;
	this.prevInterval = 0;

	var now = new Date;
	var currentTime = now.getTime();
	for (var i = 0; i < 10; ++i) {
		this.timeHistory[i] = currentTime;
	}
	this.prevFrameTime = currentTime;
}

FrameRate.finalize = function(){
}

FrameRate.set = function(frameRate){
	this.idealValue = frameRate;
	this.frameInterval = 1000 / frameRate;
}

FrameRate.getNextFrameTime = function(){
	var currentTime = new Date().getTime();
	var intervalSum = currentTime - this.timeHistory[0];
	this.actualValue = 10 * 1000 / intervalSum;
	for (var i = 0; i < 10 - 1; ++i) {
		this.timeHistory[i] = this.timeHistory[i+1];
	}
	this.timeHistory[9] = currentTime;

	var interval = this.frameInterval - (currentTime - this.prevFrameTime - this.prevInterval);
//	content.document.getElementById('frame').innerHTML="framerate: " +this.actualValue + " interval:" + interval + "frameInterval: ";
	this.prevFrameTime = currentTime;
	if (interval < 0){
		interval = 0;
	}
	this.prevInterval = interval;

	return interval;
}
