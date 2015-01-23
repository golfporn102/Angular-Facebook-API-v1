var myapp = angular.module('buttonsDemo1', ['ngMaterial', 'Facebook']);

myapp.config(function(FB_initProvider) {
	FB_initProvider.init('1595647823988939');
});

myapp.controller('AppCtrl', function($scope, FB_User) {
	FB_User.login();
	$scope.onLogin = function() {
		FB_User.login(function(){
			
		});
	}
	
});