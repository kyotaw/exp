var DEMO = DEMO || {};

//app
DEMO.userListApp = angular.module('UserListApp', ['i18next', 'userListServices', 'userListControllers']);
DEMO.userListApp.run(function($rootScope){
	$rootScope.i18nextOptions = {
		lng : 'ja-JP',
		resStore : transResources
	};
});

