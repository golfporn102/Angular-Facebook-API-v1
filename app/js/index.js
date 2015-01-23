var myapp = angular.module('buttonsDemo1', ['ngMaterial', 'Facebook']);

myapp.config( function(FB_initProvider) {
	FB_initProvider.init('1595647823988939');
});

myapp.controller('Userlogin', function($scope, FB_UserLogin) {
	
	function checklogin( response ) {
		if(response) {
			$scope.islogin = true;
		}
		else {
			$scope.islogin = false;
		}
	}
	FB_UserLogin.getLoginStatus( function( response) {
		$scope.$apply( function() {
			checklogin( response );
		});
		
	});
	
	$scope.onLogin = function() {
		FB_UserLogin.login( function( response ){
			$scope.$apply( function() {
				checklogin( response );
			});
		});
	}
	
	$scope.onLogout = function() {
		FB_UserLogin.logout();
		checklogin( false );	
	}
	
});

myapp.controller('Pages', function ($scope, FB_Page) {

	FB_Page.loadPages( function ( response ) {
		$scope.pages = [];
		$scope.$apply( function() {
			$scope.pages = response;
		});
	})

	$scope.onSelectedPage = function(key) {
		FB_Page.setCurrentPage(key);
		FB_Page.loadConversations( function ( response) {
			$scope.$broadcast('onConverstions', response);
		});
	}
});

myapp.controller('Conversations', function($scope, $timeout, FB_Page, FB_User ){
	
	$scope.$on('onConverstions', function(event, response) {

		$scope.conversations = {};
		$scope.$apply( function() {
			$scope.conversations = response;
		});
		loadPicture(0);
	});

	function loadPicture(key) {
		var conversation_id = $scope.conversations.data[key].interlocutor.id;
		
		FB_User.loadUser( conversation_id , function(response) {
			$scope.$apply( function(){
				$scope.conversations.data[key].interlocutor.cover = response.data.url;
			});

			if(key < $scope.conversations.data.length) {
				loadPicture(key);
			}
		});
	}


});

myapp.controller('Messages', function($scope) {

});
