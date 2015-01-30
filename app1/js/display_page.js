angular.module('app1').controller('display_pageCtrl', function ($scope, $state, parseDB){
	console.log("display_page");
	console.log( parseDB );
	
	$scope.logout_onClick = function () {
		if( !parseDB.parseLogout() ) {
			$state.go('login_page')
		}
	}
});
