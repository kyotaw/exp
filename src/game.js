var FURO = FURO || {};
FURO.Game = {};

//Core module
FURO.Game.Core = {};
FURO.Game.Core.Loop = (function(){
	//private
	var _stopRequest = false;
	var _running = false;
	var _pausing = false;

	var _startCB = null;
	var _stopCB = null;
	var _updateCB = null;
	var _preUpdateCB = null;
	var _pauseCB = null;

	function loop(){
		if (_stopRequest) {
			if (_stopCB != undefined) {
				_stopCB();
			}
			_running = false;
			_pausing = false;
			return;
		}
		if (_startCB != undefined) {
			_startCB();
			_startCB = undefined;
		}

		if (_pausing) {
			if (_pauseCB != undefined) {
				_pauseCB();
			}
		} else {
			if (_preUpdateCB != undefined) {
				_preUpdateCB();
			}
			if (_updateCB != undefined) {
				_updateCB();
			}
		}

		var sleep = QFrameRate.getIntervalToNextFrame();
		setTimeout(
			(function(obj){
				return function(){
					loop.call(obj);
					};
			}(this)), sleep);
	};

	//public
	return {
		start : function(config){
			if (_running) {
				return;
			}
			_startCB = config.start;
			_stopCB = config.stop;	
			_preUpdateCB = config.preUpdate;
			_updateCB = config.update;
			_pauseCB = config.pause;
			QFrameRate.value(config.frameRate || 30);
				
			_stopRequest = false;
			_running = true;
			_pausing = false;
		
			loop.call(this);
		},
		stop : function(f) {
			if (!_running) {
				return;
			}
			_stopCB = f;
			_stopRequest = true;
		},
		pause : function(pause, f) {
			if (!_running) {
				return;
			}
			_pauseCB = f;
			_pausing = pause;
		}
	}
}());

//FrameRate module
FURO.Game.Core.FrameRate = (function(){
	//private
	var idealValue = 0;
	var actualValue = 0;
	var frameInterval = 0;
	var prevInterval = 0;
	var prevFrameTime = 0;
	var timeHistory = [];

	//initalize
	(function(){
		var now = new Date;
		var currentTime = now.getTime();
		for (var i = 0; i < 10; ++i) {
			timeHistory[i] = currentTime;
		}
		prevFrameTime = currentTime;
		idealValue = 30;
		frameInterval = 1000 / idealValue;
	}());

	//public
	return {
		value : function(frameRate){
			if (frameRate != undefined) {
				idealValue = frameRate;
				frameInterval = 1000 / frameRate;
			} else {
				return actualValue;
			}
		},
		getIntervalToNextFrame : function(){
			var currentTime = new Date().getTime();
			var intervalSum = currentTime - timeHistory[0];
			actualValue = 10 * 1000 / intervalSum;
			for (var i = 0; i < 10 - 1; ++i) {
				timeHistory[i] = timeHistory[i+1];
			}
			timeHistory[9] = currentTime;

			var interval = frameInterval - (currentTime - prevFrameTime - prevInterval);
			prevFrameTime = currentTime;
			if (interval < 0){
				interval = 0;
			}
			prevInterval = interval;

			return interval;
		}
	};
}());

var QLoop = FURO.Game.Core.Loop;
var QFrameRate = FURO.Game.Core.FrameRate;
