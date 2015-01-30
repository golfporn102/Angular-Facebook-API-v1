(function() {

	var currentuser = null; 
	var app_id = null;
	
	function checklogin(response, callback) {
		
		if (response.status == "connected") {
				
			currentuser = response.authResponse;
				
			console.group(" current user : ");
			console.log( currentuser );
			console.groupEnd();
				
			callback(currentuser);
		}
		else {
			console.log(" user not login");
			callback(false)
				
		}
	}
	
	
	var facebook = {};
	
	facebook.init = function(appid) {

		FB.init({
		    appId      : appid,
		    xfbml      : true,
		    version    : 'v2.2'
	    });

	    app_id = appid;

	    console.group(" init app : ");
	    console.log("	id :" + appid);
	    console.groupEnd();
	}

	facebook.getLoginStatus = function(callback) {

		FB.getLoginStatus( function(response){
			checklogin(response, callback);
		});
	}
	
	facebook.getCurrentuser = function() {
		
		return currentuser;
	}
	
	facebook.login = function( callback ) {
		
		FB.login( function(response){
			checklogin(response, callback);
		});
	}
	
	facebook.logout = function() {
		
		FB.logout();
	}

	
	

	var app = angular.module('Facebook', []);
	
	app.provider('FB_init', function(){
		return {
			init: facebook.init,
			$get :{
				appid : facebook.appid
			}
		}
	});

	app.service('FB_UserLogin', function(){
		this.login = facebook.login;
		this.getLoginStatus = facebook.getLoginStatus;
		this.logout = facebook.logout;
	});
	
	app.service('FB_Page', function( $interval ) {
		
		this.loadPages = function(callback) {
			
			var stop = $interval( function(){
				if(facebook.getCurrentuser()) {
					$interval.cancel(stop);
					facebook.loadPages(callback);
				}
			},3000)
		}
		this.setCurrentPage = facebook.setCurrentPage;
		
		this.getCurrentPage = facebook.getCurrentPage;
		
		this.loadConversations = function( callback) {
			
			facebook.loadConversations( function( response ) {
				console.log ( response);
				var data = [];
				
				
				for( var key in response.data) {
					data.push( facebook.addObjectInterlocutor ( response.data[key] ) );
				}
				
				response.data = data;
				console.group(" conversations : ");
				console.log( response );
				console.groupEnd();

				callback( response );
			})
		}

		this.loadReceive_message =  facebook.loadReceive_message;
		this.send_message = facebook.send_message;
		
	});
		

})();



// facebook.config(function(fb_initProvider) {
// 	fb_initProvider.init('1595647823988939');
// })