var DEMO = DEMO || {};

DEMO.User = Class.extend((function(){
	var self = {};

	self.init = function(attrs){
		this.name = attrs.name || "Not Registered";
		this.mail = attrs.mail || "Not Registered";
	}
	
	return self;
})());

DEMO.userListApp = angular.module('UserListApp', []);

DEMO.userListApp.controller('UserListCtrl', function UserListCtrl($scope){
	$scope.users = [
		new DEMO.User({name : 'Name', mail : 'Mail'})
	];
	$scope.add = function(){
		$scope.users.push(new DEMO.User({name:$scope.name, mail:$scope.mail}));
	}
	$scope.delete = function(index){
		$scope.users.splice(index, 1);
	}
});
