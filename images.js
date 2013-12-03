var DEMO = DEMO || {};



//app
DEMO.imagesApp = angular.module('ImageApp', ['ImageControllers']);

//controllers
DEMO.imageControllers = angular.module('ImageControllers', []);
DEMO.imageControllers.controller('ImageCtrl', ['$scope', function ImageCtrl($scope){
	$scope.images = [
		{src : "images/image1.png"},
		{src : "images/image2.png"}
	];
	$scope.curImage = 0;
	$scope.prev = function(){
	}
	$scope.next = function(){
	}
	$scope.setUrl = function(url){
		$(".imgFrame").addClass("blownAwayAnime");
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
