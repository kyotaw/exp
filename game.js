FURO.Game = {};

//Core module
FURO.Game.Core = (function(){
	//private
	var mEndRequest = false;
	var mEnded = false;
	var mPause = false;

	function loop(){
		if (mEndRequest) {
			//finalizing
			mEnded = true;
			return;
		}

		if (!mPause) {
			this.preUpdate();
			this.update();
		}

		var sleep = this.FrameRate.getIntervalToNextFrame();
		setTimeout(
			(function(obj){
				return function(){
					loop.call(obj);
					};
			}(this)), sleep);
	};

	//public
	return {
		update : function(){
			alert("Game::update() - No Implementation");
		},
		preUpdate : function(){
			alert("Game::preUpdate() - No Implementation");
		},
		run : function(){
			mEndRequest = false;
			mEnded = false;
			loop.call(this);
		},
		setEndRequest : function() { mEndRequest = true },
		ended : function() { return mEnded },
		pause : function(pause) { mPause = pause },
		FrameRate : {}
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
		set : function(frameRate){
			idealValue = frameRate;
			frameInterval = 1000 / frameRate;
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

//Position module
//the origin in this module is left-top
FURO.Game.Position = (function(){
	//private

	//public
	return {
		getBoundingRect : function(node){
			var type = node.nodeType;
			if (type == node.TEXT_NODE) {
				var range = node.ownerDocument.createRange();
				range.selectNode(node);
				var rect =  range.getBoundingClientRect();
				range.detach();
				return rect;
			} else if (type == node.ELEMENT_NODE) {
				return node.getBoundingClientRect();
			}
		},

		overlap : function(rectA, rectB){
			if (rectA.left >= rectB.right) {
				return false;
			}
			if (rectA.bottom <= rectB.top) {
				return false;
			}
			if (rectA.right <= rectB.left) {
				return false;
			}
			if (rectA.top >= rectB.bottom) {
				return false;
			}
			return true;
		},

		colisionDirection : function(rectA, vA, rectB){
			var movedA = {
				left : rectA.left + vA.x,
				bottom : rectA.bottom + vA.y,
				right : rectA.right + vA.x,
				top : rectA.top + vA.y};
		
			if (!this.overlap(movedA, rectB)) {
				//not collides
				return -1;
			}
			if (vA.x > 0) {
				if (vA.y > 0) {
					//A collides with top or left of B
					if ((rectA.bottom <= rectB.top) && (movedA.bottom > rectB.top)) {
						return 4; //collide with top
					} else if ((rectA.right <= rectB.left) && (movedA.right > rectB.left)) {
						return 1; //collide with left
					}
				} else {
					//A collides with left or bottom of B
					if ((rectA.right <= rectB.left) && (movedA.right > rectB.left)) {
						return 1; //collide with left
					} else if ((rectA.top >= rectB.bottom) && (movedA.top < rectB.bottom)) {
						return 2; //collide with bottom
					}
				}
			} else {
				if (vA.y > 0) {
					//A collides with right or top of B
					if ((rectA.bottom <= rectB.top) && (movedA.bottom > rectB.top)) {
						return 4; //collide with top
					} else if ((rectA.left >= rectB.right) && (movedA.left < rectB.right)) {
						return 3; //collide with right
					}
				} else {
					//A collides with right or bottom of B
					if ((rectA.left >= rectB.right) && (movedA.left < rectB.right)) {
						return 3; //collide with right
					} else if ((rectA.top >= rectB.bottom) && (movedA.top < rectB.bottom)) {
						return 2; //collide with bottom
					}
				}
			}
			return -1;
		}
	};
}());

//Input module
FURO.Game.Input = (function(){
	//private
	var addKeyActionPriv;
	var removeKeyActionPriv;

	//initialize
	(function(){
		addKeyActionPriv = function(elem, action){
			if (!elem) {
				return false;
			}
			elem.addEventListener('mousemove', action, false);
			return true;
		};
		removeKeyActionPriv = function(elem, action){
			if (!elem) {
				return false;
			}
			elem.removeEventListener('mousemove', action, false);
			return true;
		};
	}());

	//public
	return {
		addKeyAction : function(elem, action){
			addKeyActionPriv(elem, action);
		},
		removeKeyAction : function(elem, action){
			removeKeyActionPriv(elem, action);
		}
	};
}());
