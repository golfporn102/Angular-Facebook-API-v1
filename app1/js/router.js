angular.module('app1').config( function( $stateProvider, $urlRouterProvider ) {
	
	$stateProvider
		.state('loadApp_page' , {
			url: '/load' ,
			templateUrl: '../views/initapp_page.html',
			controller: 'initapp_pageCtrl'
		})
		.state('login_page' , {
			url: '/login',
			templateUrl: '../views/login_page.html',
			controller: 'login_pageCtrl'
		})
		.state('display_page' , {
			url: '/display',
			templateUrl: '../views/display_page.html',
			controller: 'display_pageCtrl'
		})
		.state('manage_page' , {
			url: '/manage',
			templateUrl: '../views/manage_page.html',
			controller: 'manage_pageCtrl'
		})
});