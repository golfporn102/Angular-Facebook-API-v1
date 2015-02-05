angular.module('app1').factory( 'parseDB', function (parseDB_init, parseDB_riud, facebook_api, grouppage ,events, messaging){
	
	var service = {
		
		setParseAppId    : parseDB_init.setParseAppId,
		getParseAppId    : parseDB_init.getParseAppId,
		setJavaScriptKey : parseDB_init.setJavaScriptKey,
		getJavsScriptKey : parseDB_init.getJavsScriptKey,
		setFacebookAppId : parseDB_init.setFacebookAppId,
		getFacebookAppId : parseDB_init.getFacebookAppId,
		initParse        : parseDB_init.initParse,
		initFacebook     : parseDB_init.initFacebook,
		getCurrentUser   : parseDB_init.getCurrentUser,
		parseLogin       : parseDB_init.parseLogin,
		parseLogout      : parseDB_init.parseLogout,
		
		parseSavingObjects 			: parseDB_riud.parseSavingObjects,
		parseRetrievingObject		: parseDB_riud.parseRetrievingObject,
		insertDataToGroupTable 		: parseDB_riud.insertDataToGroupTable,
		retrieveDataFromGroupTable	: parseDB_riud.retrieveDataFromGroupTable,
		insertDataToPageTable		: parseDB_riud.insertDataToPageTable,
		retrieveDataFromPageTable 	: parseDB_riud.retrieveDataFromPageTable,
		
		FBapiRetrieveDataFromMeGroups	: facebook_api.FBapiRetrieveDataFromMeGroups,
		FBapiRetrieveDataFromPage		: facebook_api.FBapiRetrieveDataFromPage,
		FBapiRetrieveDataOfUserById 	: facebook_api.FBapiRetrieveDataOfUserById,
		FBapiRetrievePictureOfUserById 	: facebook_api.FBapiRetrievePictureOfUserById,
		FBapiAddUaerPictureToObjectById : facebook_api.FBapiAddUaerPictureToObjectById,

		groupPagesRetrieveDateFromPages	: grouppage.groupPagesRetrieveDateFromPages

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