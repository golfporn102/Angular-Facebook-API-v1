angular.module('app1').factory('parseDB_init', function (events, messaging){
	var parseAppId = '';
	var javaScriptKey = '';
	var facebookAppId = '';

	var setParseAppId = function (parse_appid) {
		parseAppId = parse_appid;
	};

	var getParseAppId = function () {
		return parseAppId;
	};

	var setJavaScriptKey = function (js_key) {
		javaScriptKey = js_key;
	};

	var getJavsScriptKey = function () {
		return javaScriptKey;
	};

	var setFacebookAppId = function (fb_appid) {
		facebookAppId = fb_appid;
	};

	var getFacebookAppId = function () {
		return facebookAppId;
	};

	var initParse = function () {
		Parse.initialize( parseAppId, javaScriptKey );
	};

	var initFacebook = function () {
		Parse.FacebookUtils.init({ // this line replaces FB.init({
	      appId      : facebookAppId, // Facebook App ID
	      status     : true,  // check Facebook Login status
	      cookie     : true,  // enable cookies to allow Parse to access the session
	      xfbml      : true,  // initialize Facebook social plugins on the page
	      version    : 'v2.2' // point to the latest Facebook Graph API version
    	});
	};

	var getCurrentUser = function () {
		return Parse.User.current();
	};

	var parseLogin = function () {
		console.log(messaging);
		messaging.publish(events.message._AUTHENTICATE_USER_LOGIN);

		Parse.FacebookUtils.logIn(null, {
			success: function (user) {
				if (!user.existed()) {
					messaging.publish(events.message._AUTHENTICATE_USER_LOGIN_SUCCESS);
			    	alert("User signed up and logged in through Facebook!");
			    	
			    } else {
			    	messaging.publish(events.message._AUTHENTICATE_USER_LOGIN_SUCCESS);
			      	alert("User logged in through Facebook!");
			    }
			},
			error: function (user, error) {
			    alert("User cancelled the Facebook login or did not fully authorize.");
			}
		});
	};
	
	var parseLogout = function () {
		Parse.User.logOut();
		return Parse.User.current()
	};

	var service = {
		
		setParseAppId    : setParseAppId,
		getParseAppId    : getParseAppId,
		setJavaScriptKey : setJavaScriptKey,
		getJavsScriptKey : getJavsScriptKey,
		setFacebookAppId : setFacebookAppId,
		getFacebookAppId : getFacebookAppId,
		initParse        : initParse,
		initFacebook     : initFacebook,
		getCurrentUser   : getCurrentUser,
		parseLogin       : parseLogin,
		parseLogout      : parseLogout
	}
	return service;	

})