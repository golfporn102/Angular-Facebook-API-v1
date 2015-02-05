angular.module('app1').factory('facebook_api', function (parseDB_init, events, messaging) {

	//  ======================== retrieve Facebook =================================
	var FBapiRetrieveDataFromMeGroups = function () {
		var url = 'me/groups';

		var token = ParseDB_init.getCurrentUser().attributes.authData.facebook.access_token;
		
		FB.api( url, {'access_token' : token } ,function (response) {
			messaging.publish( events.FBAPI.GROUP.message.RETRIEVE_SUCCESS, [response] );
		});
	};
	
	var FBapiRetrieveDataFromPage = function (pageid) {
		var url = pageid;
		var token = parseDB_init.getCurrentUser().attributes.authData.facebook.access_token;
		FB.api( url + '/feed', {'access_token' : token }, function (response) {
			messaging.publish( events.FBAPI.PAGE.message.RETRIEVE_SUCCESS, [response] );
		});
	};

	var FBapiPushFeedsToObjectById = function (pageid, object) {
		var url = pageid;
		var token = parseDB_init.getCurrentUser().attributes.authData.facebook.access_token;
		FB.api( url + '/feed', {'access_token' : token }, function (response) {

			if ( angular.isUndefined(object.data) ) {
				object.data = [];
			} 
				
			object.data = object.data.concat(response.data);
			object.paging = response.paging;
			
			messaging.publish( events.FBAPI.PAGES.message.RETRIEVE_SUCCESS);
		});
	}
	
	var FBapiRetrieveDataOfUserById = function (fb_userid, callback) {
		var url = fb_userid;
		FB.api( url , function (response) {
			callback( response );
		});
	};

	var FBapiAddUaerPictureToObjectById = function (user, callback) {
		var url = user.id + '/picture';
		FB.api(url, function (response) {
			user.picture = response.data.url;
			callback();
		});
	};

	var FBapiRetrievePictureOfUserById = function (fb_userid, callback) {
		var url = fb_userid + '/picture';
		FB.api( url, function (response) {

			callback( response );
		});
	};
	

	var service = {
		
		FBapiRetrieveDataFromMeGroups	: FBapiRetrieveDataFromMeGroups,
		FBapiRetrieveDataFromPage		: FBapiRetrieveDataFromPage,
		FBapiRetrieveDataOfUserById 	: FBapiRetrieveDataOfUserById,
		FBapiRetrievePictureOfUserById 	: FBapiRetrievePictureOfUserById,
		FBapiAddUaerPictureToObjectById : FBapiAddUaerPictureToObjectById,

		FBapiPushFeedsToObjectById		: FBapiPushFeedsToObjectById

	}
	return service;	
});