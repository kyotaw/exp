var DEMO = DEMO || {};

//services
DEMO.userListServices = angular.module('userListServices', ['ngResource']);
DEMO.userListServices.factory('Search', ['$resource', function($resource){
	return $resource('https://www.googleapis.com/plus/v1/people?query=:query&maxResults=1&key=AIzaSyAKs3agPYdR5MH7sSsDchKVh78I-OUN6Fc', {}, {});
}]);
