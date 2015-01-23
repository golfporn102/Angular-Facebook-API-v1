(function() {

	
	
	var currentuser = null; 
	
	
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
	
	facebook.appid = null;
	
	facebook.init = function(appid) {

		FB.init({
		    appId      : appid,
		    xfbml      : true,
		    version    : 'v2.2'
	    });
	    console.group(" init app : ");
	    console.log("	id :" + appid);
	    console.groupEnd();
	}

	facebook.getLoginStatus = function(callback) {

		FB.getLoginStatus( function(response){
			checklogin(response, callback);
		});
	}
	facebook.login = function( callback ) {
		FB.login( function(response){
			checklogin(response, callback);
		});
	}
	// angular.module('Facebook',[])

	// .provider('FB_init', function() {
	// 	var fb = {};
	// 	fb.appId = null;
	// 	fb.api = null;
	// 	fb.token = null;
	// 	fb.page = {};
	// 	fb.init = function(id) {
			
	// 		fb.appId = id;
	//    		alert("facebookInit");
	    	
	//     	FB.init({
	// 	      	appId      : fb.appId,
	// 	      	xfbml      : true,
	// 	      	version    : 'v2.2'
	//     	});
	// 	}

	// 	fb.$get = function(){
	// 		var fb_api = {};
			
	// 		fb_api.api = function() {
	// 			return fb.api;
	// 		}
			
	// 		fb_api.getLoginStatus = function(callback) {
	// 			FB.getLoginStatus(function(response){
	// 				if (response.status == "connected") {
	// 					fb.accessToken = response.authResponse.accessToken;
	// 					callback(response.authResponse)
	// 				}
	// 				else {
	// 					callback(false);
	// 				}

	// 			});
	// 		}
	// 		fb_api.logout = function() {
	// 			FB.logout();
	// 		}
	// 		fb_api.post_feed = function(text, callback) {
	// 			FB.api('/me/feed', 'post', {message: text, access_token  : fb.access_token}, function(response){
	// 				console.log(response);

	// 			})
	// 		}
	// 		fb_api.load_page = function(callback) {
	// 			FB.api('/me/accounts', function( response ){
	// 				fb.page = response.data[0];
	// 				callback( fb.page );
	// 			})
	// 		}
	// 		fb_api.load_conversations = function( callback ) {
	// 			console.log( fb.page.id );
	// 			FB.api('/' + fb.page.id + '/conversations', {'access_token'  : fb.page.access_token},function( response ) {
	// 				callback( response );
	// 			});
	// 		}
	// 		fb_api.send_message = function( conversation_id , message ,callback ) {
	// 			console.log(conversation_id);
	// 			FB.api('/' + conversation_id + '/messages', "POST", { "message": message ,'access_token'  : fb.page.access_token}, function(response) {
	// 				callback( response );
	// 			})
	// 		}
	// 		fb_api.receive_message = function( conversation_id ,callback ) {
	// 			FB.api('/' + conversation_id + '/messages', { 'access_token'  : fb.page.access_token}, function(response) {
	// 				callback( response );
	// 			})
	// 		}

	// 		return fb_api;
	// 	}
	// 	return fb;
	// });
	
	

	var app = angular.module('Facebook', []);
	
	app.provider('FB_init', function(){
		return {
			init: facebook.init,
			$get :{
				appid : facebook.appid
			}
		}
	});
	app.service('FB_User', function(){
		this.login = facebook.login;
		
	});
})();



// facebook.config(function(fb_initProvider) {
// 	fb_initProvider.init('1595647823988939');
// })