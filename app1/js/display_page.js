angular.module('app1').controller('display_pageCtrl', function ($scope, $state, parseDB) {
	
	var user = parseDB.getCurrentUser();
	
	$scope.user = {};
	

	parseDB.FBapiRetrieveDataOfUserById( user.attributes.authData.facebook.id, function (results) {
		$scope.$apply( function () {
			$scope.user = results;
			console.log( $scope.user );
		});
	});

	parseDB.FBapiRetrievePictureOfUserById( user.attributes.authData.facebook.id, function (results) {
		$scope.$apply( function () {
			$scope.user.picture = results.data.url;
		});
	});
	
	$scope.logout_onClick = function () {
		if( !parseDB.parseLogout() ) {
			$state.go('login_page')
		}
	}
})

.controller('panelGroupCtrl', function ($scope, parseDB, messaging, events){

	$scope.pageGroups = [];

	var groupTableRetrieveSuccess = function (results) {
		console.log( results );
		$scope.$apply( function() {
			$scope.pageGroups = results;
		});	
		parseDB.retrieveDataFromPageTable();
	};

	var pageTableRetrieveSuccess = function (results) {
		console.log( results );
		addPageToVar_pageGroups( results )
	};

	var addPageToVar_pageGroups = function (_pages) {
		var pageGroups = $scope.pageGroups;
		for ( i in pageGroups ) 
		{
			var pages = [];
			for ( j in _pages ) 
			{
				if ( pageGroups[i].id === _pages[j].attributes.groupId ) {
					pages.push( _pages[j] );
				}
			}
			pageGroups[i].pages = pages;
		}

		$scope.$apply( function() {
			$scope.pageGroups = pageGroups;
		});
	}
	$scope.showPages_onClick = function (pages) {
		console.log (pages );
		parseDB.groupPagesRetrieveDateFromPages( pages.pages );
	};

	$scope.showPage_onClick = function (page) {
		console.log( page.attributes.pageFB.id );
		parseDB.FBapiRetrieveDataFromPage( page.attributes.pageFB.id );
	};
	
	messaging.subscribe( events.DB.GROUP.message.RETRIEVE_SUCCESS , groupTableRetrieveSuccess );
	messaging.subscribe( events.DB.PAGE.message.RETRIEVE_SUCCESS , pageTableRetrieveSuccess );
	parseDB.retrieveDataFromGroupTable();
	

})

.controller('panelPageCtrl', function ($scope, messaging, events, parseDB, $timeout) {
	
	$scope.page = {};

	var retrievePictureOfUser = function (feeds) {
		
		for ( key in feeds ) 
		{
			parseDB.FBapiAddUaerPictureToObjectById( feeds[key].from , function () {
				$scope.$digest();
			});
			
			retrievePictureOfComment( feeds[key].comments );
		}
	};

	var retrievePictureOfComment = function (comments) {
		
		if ( comments === 'undefined' ) {
			for ( key in comments.data ) 
			{
				parseDB.FBapiAddUaerPictureToObjectById( comments.data[key].from , function () {
					$scope.$digest();
				});
			}
		}
	}
	
	var pageFacebookRetrieveSuccess = function (feeds) {
		console.log(feeds);
		retrievePictureOfUser( feeds.data );
		
		$scope.$apply( function () {
			$scope.feeds = feeds.data;
			console.log( $scope.feeds );
		});

		console.log( feeds );
	};

	$scope.newLines = function (text) {
		if ( text === 'undefined' ) {
			return text.replace( /\n/g, '<br>' );
		}
	};

	messaging.subscribe( events.FBAPI.PAGE.message.RETRIEVE_SUCCESS , pageFacebookRetrieveSuccess );
});


