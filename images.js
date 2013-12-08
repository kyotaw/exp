var DEMO = DEMO || {};

//app
DEMO.imagesApp = angular.module('ImageApp', ['ImageControllers', 'ngAnimate']);

//controllers
DEMO.imageControllers = angular.module('ImageControllers', []);
DEMO.imageControllers.controller('ImageCtrl', ['$scope', '$animate', function ImageCtrl($scope, $animate){
	$scope.images = [
		{src : "images/image1.png"},
		{src : "images/image2.png"},
		{src : "images/image1.png"},
		{src : "images/image2.png"},
		{src : "images/image1.png"},
		{src : "images/image2.png"},
		{src : "images/image1.png"},
		{src : "images/image2.png"},
		{src : "images/image1.png"},
		{src : "images/image2.png"},
		{src : "images/image1.png"},
		{src : "images/image2.png"}
	];
	$scope.shownImages = [0, 1, 2, 3, 4, 5, 6, 7, 8]
	$scope.centerImage = Math.floor($scope.shownImages.length / 2);
	
	$scope.next = function(url){
		$(".imageSlot").addClass("goNextAnime");
		$(".centerSlot").addClass("goNextFromCenterAnime");
		$(".centerSlot").prev().addClass("goNextToCenterAnime");

		setTimeout(function(){
			var first = $scope.shownImages[0] - 1;
			if (first < 0) {
				first = $scope.images.length - 1;
			}
			$scope.shownImages.pop();
			$scope.shownImages.unshift(first);
			$(".imageSlot").removeClass("goNextAnime");
			$(".centerSlot").removeClass("goNextFromCenterAnime");
			$(".centerSlot").prev().removeClass("goNextToCenterAnime");
			$scope.$apply();	
		},1000);
	}
	$scope.prev = function(){
		$(".imageSlot").addClass("goPrevAnime");
		$(".centerSlot").addClass("goPrevFromCenterAnime");
		$(".centerSlot").next().addClass("goPrevToCenterAnime");

		setTimeout(function(){
			var last = $scope.shownImages[$scope.shownImages.length - 1] + 1;
			if (last >= $scope.images.length) {
				last = 0;
			}
			$scope.shownImages.shift();
			$scope.shownImages.push(last);
			$(".imageSlot").removeClass("goPrevAnime");
			$(".centerSlot").removeClass("goPrevFromCenterAnime");
			$(".centerSlot").next().removeClass("goPrevToCenterAnime");
			$scope.$apply();	
		},1000);
	}
}]);

//models
DEMO.User = Class.extend((function(){
	var self = {};

	self.init = function(attrs){
		this.profile = {};
		this.profile['name'] = attrs.name || "Not Registered";
		this.profile['mail'] = attrs.mail || "Not Registered";
		this.profile['id'] = attrs.id || "";
		this.profile['url'] = attrs.url || "";
		this.profile['image'] = attrs.image || "No Image";
	}
	self.getGooglePProfile = function(Search){
			if (this.profile.name == 'Not Registered') {
				return;
			}
			var inst = this;
			Search.get({query : this.profile.name}, function(res){
				if (res.items.length == 0) {
					return;
				}
				inst.profile['id'] = res.items[0].id;
				inst.profile['url'] = res.items[0].url;
				inst.profile['image'] = res.items[0].image.url;
				
				/*url = getRsrc.replace(':userId', inst.profile['id']);
				$.get(url, function(res){
					inst.profile['location'] = res.currentLocation;
					inst.profile['about'] = res.aboutMe;
				});*/
			});
		}
	
	return self;
})());
