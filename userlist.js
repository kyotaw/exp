var DEMO = DEMO || {};

//app
DEMO.userListApp = angular.module('UserListApp', ['userListServices', 'userListControllers']);

//services
DEMO.userListServices = angular.module('userListServices', ['ngResource']);
DEMO.userListServices.factory('GoogleP', ['$resource', function($resource){
	return $resource('https://www.googleapis.com/plus/v1/people?query=:query&maxResults=1&key=AIzaSyAKs3agPYdR5MH7sSsDchKVh78I-OUN6Fc', {}, {});
}]);

//controllers
DEMO.userListControllers = angular.module('userListControllers', []);
DEMO.userListControllers.controller('UserListCtrl', ['$scope', 'GoogleP', function UserListCtrl($scope, GoogleP){
	$scope.users = [
		new DEMO.User({name : 'Name', mail : 'Mail'})
	];
	$scope.add = function(){
		var user = new DEMO.User({name:$scope.name, mail:$scope.mail});
		user.getGooglePProfile(GoogleP);
		$scope.users.push(user);
	}
	$scope.delete = function(index){
		$scope.users.splice(index, 1);
	}
}]);

//models
DEMO.User = Class.extend((function(){
	var self = {};

	self.init = function(attrs){
		this.name = attrs.name || "Not Registered";
		this.mail = attrs.mail || "Not Registered";
		this.googleP = attrs. googleP || "";
		this.facebook = attrs.facebook || "";
		this.twitter = attrs.twitter || "";
	}
	self.getGooglePProfile = function(resource){
		var inst = this;
		resource.get({query:this.name}, function(result){
			if (result.items.length == 0) {
				return;
			}
			inst.googleP = result.items[0].url;
		});
	}
	
	return self;
})());
