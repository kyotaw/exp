var DEMO = DEMO || {};

//app
DEMO.userListApp = angular.module('UserListApp', ['userListControllers', 'userListServices']);

//services
DEMO.userListServices = angular.module('userListServices', ['ngResource']);
DEMO.userListServices.factory('Search', ['$resource', function($resource){
	return $resource('https://www.googleapis.com/plus/v1/people?query=:query&maxResults=1&key=AIzaSyAKs3agPYdR5MH7sSsDchKVh78I-OUN6Fc', {}, {});
}]);

//controllers
DEMO.userListControllers = angular.module('userListControllers', []);
DEMO.userListControllers.controller('UserListCtrl', ['$scope', 'Search', function UserListCtrl($scope, Search){
	$scope.users = [];
	$scope.curUser = 0;
	$.each(users, function(index, userData){
		var user = new DEMO.User(userData);
		user.getGooglePProfile(Search);
		$scope.users.push(user);
	});
	$scope.showProfile = function(index){
		$scope.curUser = index;
	}
	$scope.clear = function(){
		$.each($scope.users, function(index, val){
			$scope.users.splice(index, 1, new DEMO.User({}));
		});
	}
	$scope.refresh = function(){
		$scope.users[$scope.curUser].getGooglePProfile(Search);
	}
	$scope.prev = function(){
		if (--($scope.curUser) < 0) {
			$scope.curUser = $scope.users.length - 1;
		}
	}
	$scope.next = function(){
		if (++($scope.curUser) >= $scope.users.length) {
			$scope.curUser = 0;
		}
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
