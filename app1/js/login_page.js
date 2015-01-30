angular.module('app1').controller('login_pageCtrl', function ($state, $scope, parseDB, events, messaging){
	console.log( parseDB );
	console.log("login_page");

	if( parseDB.getCurrentUser() ) {
		$state.go('display_page');
	}

	var userLoginSuccess = function () {
		$state.go('display_page');
	};

	messaging.subscribe(events.message._AUTHENTICATE_USER_LOGIN_SUCCESS, userLoginSuccess );

	$scope.login_click = function () {
		parseDB.parseLogin();
	}
});
