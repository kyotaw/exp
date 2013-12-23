var DEMO = DEMO || {};

//controllers
DEMO.userListControllers = angular.module('userListControllers', []);
DEMO.userListControllers.controller('UserListCtrl', ['$scope', 'Search', function UserListCtrl($scope, Search){
	$scope.users = [];
	$scope.tmpUser = new DEMO.User({});
	$scope.curUser = 0;
	$scope.curLang = 'ja-JP';

	$.each(users, function(index, userData){
		var user = new DEMO.User(userData);
		user.getGooglePProfile(Search);
		$scope.users.push(user);
	});

	$scope.add = function(){
		if ($scope.tmpUser.validate()) {
			$scope.users.push(new DEMO.User($scope.tmpUser.profile));
			$('#user-list').listview('refresh');
			$scope.tmpUser = new DEMO.User({});
		}
	}

	$scope.delete = function(index){
		$scope.users.splice(index, 1);
		$('#user-list').listview('refresh');
	}

	$scope.showProfile = function(index){
		$scope.curUser = index;
	}

	$scope.clear = function(){
		$.each($scope.users, function(index, val){
			$scope.users.splice(index, 1, new DEMO.User({}));
		});
	}

	$scope.refresh = function(){
		if ($scope.users[$scope.curUser].validate()) {
			$scope.users[$scope.curUser].getGooglePProfile(Search);
		}
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

	$scope.switchLang = function() {
		$scope.curLang = $scope.curLang == 'ja-JP' ? 'en-US' : 'ja-JP';
		$scope.$root.i18nextOptions = {lng : $scope.curLang};
	}
}]);
