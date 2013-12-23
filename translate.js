var DEMO = DEMO || {};

var transModule = angular.module('i18next', []).directive('ngI18next', function($rootScope) {
	var translate = null;
	var transTargets = [];
	var curOptions = {};

	function getTransFunc(t) {
		var rsrc = t;
		return function(target) {
			var t = rsrc(target.transKey);
			target.elem.text(rsrc(target.transKey));
		}
	}

	function init() {
		window.i18n.init(curOptions, function(t) {
			translate = getTransFunc(t);
			for (var i = 0; i < transTargets.length; ++i) {
				var target = transTargets[i];
				translate(target);
			}
		});
	}

	$rootScope.$watch('i18nextOptions', function() {
		curOptions = $rootScope.i18nextOptions || curOptions;
		init();
	});

	return {
		restrict : 'A',
		link : function(scope, elem, attrs) {
			attrs.$observe('ngI18next', function(value) {
				if (value === '') {
					value = elem.text().replace(/^\s+$/g, '');
				}
				
				if (value !== '') {
					var target = { elem : elem, transKey : value };
					if (translate !== null) {
						translate(target);
					}
					transTargets.push(target);
				}
			});
		}
	};
});
