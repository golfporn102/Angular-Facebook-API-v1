angular.module('app1').factory('parseDB', function (events, messaging){
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

	var parseSavingObjects = function (parseclass, data, callback) {
		var ObjectDB = Parse.Object.extend( parseclass );
		var objectDB = new ObjectDB();

		objectDB.save( data , {
			success: function (objectDB) {
				callback( objectDB );
			},
			error: function (objectDB, error) {
				alert('Failed to create new object, with error code: ' + error.message);
			}
		});
	
	};

	var parseRetrievingObject = function (parseclass, callback) {
		var ObjectDB = Parse.Object.extend( parseclass );
		var objectDB = new Parse.Query( ObjectDB );
		console.log( objectDB);
		objectDB.find( {
			success: function (objectDB) {
				callback( objectDB )
			},
			error: function (object, error) {
				alert(error);
			}
		} );
	};

	// ==============  insert update date retrieve Parse =========================
	var insertDataToGroupTable = function (data) {
		var object = 'Group';
		
		parseSavingObjects( object, data, function(results) {
			console.log(results);
			messaging.publish(events.DB.GROUP.message.INSERT_SUCCESS, [results]);
		});
	};

	var retrieveDataFromGroupTable = function () {
		var object = 'Group';

		parseRetrievingObject( object, function (results) {
			messaging.publish(events.DB.GROUP.message.RETRIEVE_SUCCESS, [results]);
		});
	};

	var insertDataToPageTable = function (data) {
		var object = 'Page';

		parseSavingObjects( object, data, function (results) {
			messaging.publish( events.DB.PAGE.message.RETRIEVE_SUCCESS, [results] );
		});
	};

	var retrieveDataFromPageTable = function () {
		var object = 'Page';

		parseRetrievingObject( object, function (results) {
			messaging.publish(events.DB.PAGE.message.RETRIEVE_SUCCESS, [results]);
		});
	};

	
	//  ======================== retrieve Facebook =================================
	var FBapiRetrieveDataFromMeGroups = function () {
		var url = 'me/groups';

		var token = getCurrentUser().attributes.authData.facebook.access_token;
		
		FB.api( url, {'access_token' : token } ,function (response) {
			messaging.publish( events.FBAPI.GROUP.message.RETRIEVE_SUCCESS, [response] );
		});
	};
	var FBapiRetrieveDataFromPage = function (pageid) {
		var url = pageid;
		var token = getCurrentUser().attributes.authData.facebook.access_token;
		FB.api( url + '/feed', {'access_token' : token }, function (response) {
			messaging.publish( events.FBAPI.PAGE.message.RETRIEVE_SUCCESS, [response] );
		});
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
		parseLogout      : parseLogout,
		parseSavingObjects 			: parseSavingObjects,
		insertDataToGroupTable 		: insertDataToGroupTable,
		retrieveDataFromGroupTable	: retrieveDataFromGroupTable,
		insertDataToPageTable		: insertDataToPageTable,
		FBapiRetrieveDataFromMeGroups	: FBapiRetrieveDataFromMeGroups,
		retrieveDataFromPageTable 	: retrieveDataFromPageTable,
		FBapiRetrieveDataFromPage	: FBapiRetrieveDataFromPage

	}

	return service;	

}).run( function (parseDB) {
	var parse_appId = "HjO2AHpm0EJ04NTHjp33GsBnUm8rbiaoVX37U47t";
	var parse_jsKey = "xFTfduAOgx0TnsIH5Ndib7yLQovwPMnLNPKHah2Z";
	var facebook_appKey = "274630732660768";

	parseDB.setParseAppId( parse_appId );
	parseDB.setJavaScriptKey( parse_jsKey );
	parseDB.setFacebookAppId( facebook_appKey );
	parseDB.initParse();
	parseDB.initFacebook();

});