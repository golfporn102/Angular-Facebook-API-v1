angular.module('app1').controller('display_pageCtrl', function ($scope, $state, parseDB){
	console.log("display_page");
	console.log( parseDB );
	
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
		for( i in pageGroups ) 
		{
			var pages = [];
			for( j in _pages ) 
			{
				if( pageGroups[i].id === _pages[j].attributes.groupId ) {
					pages.push( _pages[j] );
				}
			}
			pageGroups[i].pages = pages;
		}
		$scope.$apply( function() {
			$scope.pageGroups = pageGroups;
		});
	}

	$scope.showPage_onClick = function (page) {
		console.log(page.attributes.pageFB.id);
		parseDB.FBapiRetrieveDataFromPage( page.attributes.pageFB.id );
	};
	
	messaging.subscribe( events.DB.GROUP.message.RETRIEVE_SUCCESS , groupTableRetrieveSuccess );
	messaging.subscribe( events.DB.PAGE.message.RETRIEVE_SUCCESS , pageTableRetrieveSuccess );
	parseDB.retrieveDataFromGroupTable();
	

})

.controller('panelPageCtrl', function ($scope, messaging, events) {
	
	$scope.page = {};
	var pageFacebookRetrieveSuccess = function (feeds) {
		
		$scope.$apply( function () {
			$scope.feeds = feeds.data;
		});
		
		console.log( feeds );
	};

	messaging.subscribe( events.FBAPI.PAGE.message.RETRIEVE_SUCCESS , pageFacebookRetrieveSuccess );
});


