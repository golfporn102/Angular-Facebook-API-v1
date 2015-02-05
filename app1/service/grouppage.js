angular.module('app1').factory('grouppage', function (facebook_api, events, messaging) {

	var feeds = [];
	var g_pages;
	var keyFeeds = [];
	var countPageSuccess = 0;
	
	var groupPagesRetrieveDateFromPages = function (pages) {
		g_pages = pages

		angular.forEach( pages, function (page, key) {
			var id = page.attributes.pageFB.id;
			page.feeds = {};
			facebook_api.FBapiPushFeedsToObjectById( id, page.feeds );
		});
	};

	var retrievePageSuccess = function () {
		return g_pages.length === ++countPageSuccess;  
	};

	var initKeyFeedsIsZero = function () {
		for ( key in g_pages ) 
		{
			keyFeeds[key] = 0;
		}
	};

	var isNumberGreat = function (num1, num2) {
		return num1 > num2;
	};

	var findGreatDate = function (key1, key2) {
		
		var dateKey1 = new Date( g_pages[key1].feeds.data[ keyFeeds[key1] ].updated_time );
		var dateKey2 = new Date( g_pages[key2].feeds.data[ keyFeeds[key2] ].updated_time );

		var isKey1GreatKey2;

		if ( dateKey1.getFullYear() !== dateKey2.getFullYear() ) {
			isKey1GreatKey2 =  isNumberGreat( dateKey1.getFullYear() , dateKey2.getFullYear() );
		
		} else if ( dateKey1.getMonth() !== dateKey2.getMonth() ) {
			isKey1GreatKey2 =  isNumberGreat( dateKey1.getMonth() , dateKey2.getMonth());
		
		} else if ( dateKey1.getDate() !== dateKey2.getDate() ) {
			isKey1GreatKey2 =  isNumberGreat( dateKey1.getDate() , dateKey2.getDate() );
		
		} else if ( dateKey1.getHours() !== dateKey2.getHours() ) {
			isKey1GreatKey2 =  isNumberGreat( dateKey1.getHours() , dateKey2.getHours() );
		
		} else if ( dateKey1.getMinutes() !== dateKey2.getMinutes() ) {
			isKey1GreatKey2 =  isNumberGreat( dateKey1.getMinutes() , dateKey2.getMinutes() );
		
		} else if ( dateKey1.getSeconds() !== dateKey2.getSeconds() ) {
			isKey1GreatKey2 = isNumberGreat( dateKey1.getSeconds() , dateKey2.getSeconds() );
		
		} else return;

		return ( isKey1GreatKey2 )? key1: key2; 

	};

	var selectFeedFromPages = function () {
		var mindate = 0;
		
		for( var i = 1,l = g_pages.length; i < l; i++)
		{
			mindate = findGreatDate( mindate, i);
		}
		keyFeeds[mindate]++;
		//console.log(mindate);
		return g_pages[mindate].feeds.data[ keyFeeds[mindate] ];
	};

	var retrievePagesSuccess = function () {
		
		if ( retrievePageSuccess() ) {

			initKeyFeedsIsZero();
			var feeds = {};
			feeds.data = [];
			
			for ( var i = 0; i < 25; i++)
			{
				feeds.data.push( selectFeedFromPages () );
			}
			messaging.publish( events.FBAPI.PAGE.message.RETRIEVE_SUCCESS, [feeds] );
		}
	};

	messaging.subscribe( events.FBAPI.PAGES.message.RETRIEVE_SUCCESS , retrievePagesSuccess);
	
	var service = {
		groupPagesRetrieveDateFromPages: groupPagesRetrieveDateFromPages
	}

	return service;	
});