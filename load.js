var DEMO = DEMO || {};

require.config({
	shim : {
		'jquery' : {
			exports : '$'
		},
		'jquery-mobile' : {
			deps : ['jquery']
		},
		'angular' : {
			deps : ['jquery', 'jquery-mobile'],
			exports : 'angular'
		},
		'i18next' : {
			exports : 'i18next'
		},
		'services' : {
			deps : ['angular']
		},
		'translate' : {
			deps : ['i18next', 'angular']
		},
		'models' : {
			deps : ['class']
		},
		'controllers' : {
			deps : ['translate', 'services', 'models']
		},
		'userlist' : {
			deps : ['controllers']
		}
	},
	paths : {
		'jquery' : 'lib/jquery/jquery-1.10.2',
		'jquery-mobile' : 'lib/jquery-mobile/jquery.mobile-1.3.2',
		'angular' : 'lib/angular/angular',
		'angular-resource' : 'lib/angular/angular-resource',
		'class' : 'lib/class/class',
		'i18next' : 'lib/i18next/i18next-1.7.1',
		'translate' : 'translate',
		'services' : 'services',
		'models' : 'models',
		'controllers' : 'controllers',
		'userlist' : 'userlist',
		'locales' : 'locales/resource',
		'users' : 'users/users'
	}
});

require([
	'angular',
], function(angular){
		
	//app
	DEMO.userListApp = angular.module('UserListApp', ['i18next', 'userListServices', 'userListControllers']);
	DEMO.userListApp.run(function($rootScope){
		$rootScope.i18nextOptions = {
			lng : 'ja-JP',
			resStore : transResources
		};
	});
	return DEMO.userListApp;
});
