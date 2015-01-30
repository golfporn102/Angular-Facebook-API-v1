(function() {
	
	var facebook = {};
	facebook.loadUser = function(user_id, callback) {
		
		FB.api('/' + user_id + '/picture', function( response ) {
			callback( response );
		});	
	}

	facebook.loadPages = function(user_id ,callback ) {
		FB.api('/user_id/accounts', function( response ){
			pages = response.data;

			console.group(" Pages : ");
			console.log( pages );
			console.groupEnd();
				
			callback( pages );
		});
	}

	var app = angular.module('Facebook', []);

	app.service('FB_User', function(){
		
		this.loadUser = facebook.loadUser;
		
		this.loadPages = facebook.loadPages;
	});


})();