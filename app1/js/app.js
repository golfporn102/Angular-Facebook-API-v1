angular.module('app1', ['ngMaterial','ui.router']);

angular.module('app1').constant('events', {
	message : {
		_ERVER_REQUEST_STARTED 					: '_SERVER_REQUEST_STARTED',
		_SERVER_REQUEST_ENDED_  				: '_SERVER_REQUEST_ENDED_',
		_AUTHENTICATE_USER_LOGIN				: '_AUTHENTICATE_USER_LOGIN',
		_AUTHENTICATE_USER_LOGIN_SUCCESS		: '_AUTHENTICATE_USER_LOGIN_SUCCESS',
	},
	DB : {
		GROUP : {
			name : 'Group', 
			message: {
				RETRIEVE			: '_DB_GROUP_RETRIEVE',
				RETRIEVE_SUCCESS	: '_DB_GROUP_RETRIEVE_SUCCESS',
				RETRIEVE_ERROR		: '_DB_GROUP_RETRIEVE_ERROR',
				INSERT		   		: '_DB_GROUP_INSERT',
				INSERT_SUCCESS 		: '_DB_GROUP_INSERT_SUCCESS',
				INSERT_ERROR		: '_DB_GROUP_INSERT_ERROR',
				UPDATE  			: '_DB_GROUP_UPDATE',
				DELETE  			: '_DB_GROUP_DELETE'
			}
		},
		PAGE : {
			name : 'Page', 
			message: {
				RETRIEVE			: '_DB_PAGE_RETRIEVE',
				RETRIEVE_SUCCESS	: '_DB_PAGE_RETRIEVE_SUCCESS',
				RETRIEVE_ERROR		: '_DB_PAGE_RETRIEVE_ERROR',
				INSERT		   		: '_DB_PAGE_INSERT',
				INSERT_SUCCESS 		: '_DB_PAGE_INSERT_SUCCESS',
				INSERT_ERROR		: '_DB_PAGE_INSERT_ERROR',
				UPDATE  			: '_DB_PAGE_UPDATE',
				DELETE  			: '_DB_PAGE_DELETE'
			}
		},
		GROUP_AND_PAGE : {
			name : 'Group/Page', 
			message: {
				RETRIEVE			: '_DB_GROUP_AND_PAGE_RETRIEVE',
				RETRIEVE_SUCCESS	: '_DB_GROUP_AND_PAGE_RETRIEVE_SUCCESS',
				RETRIEVE_ERROR		: '_DB_GROUP_AND_PAGE_RETRIEVE_ERROR',
				INSERT		   		: '_DB_GROUP_AND_PAGE_INSERT',
				INSERT_SUCCESS 		: '_DB_GROUP_AND_PAGE_INSERT_SUCCESS',
				INSERT_ERROR		: '_DB_GROUP_AND_PAGE_INSERT_ERROR',
				UPDATE  			: '_DB_GROUP_AND_PAGE_UPDATE',
				DELETE  			: '_DB_GROUP_AND_PAGE_DELETE'
			}
		},

	},
	FBAPI: {
		GROUP : {
			url: 'me/groups',
			message : {
				RETRIEVE			: '_FBAPI_GROUP_RETRIEVE',
				RETRIEVE_SUCCESS	: '_FBAPI_GROUP_RETRIEVE_SUCCESS',
				RETRIEVE_ERROR		: '_FBAPI_GROUP_RETRIEVE_ERROR',
			}
		},
		PAGE : {
			url: 'me/groups',
			message : {
				RETRIEVE			: '_FBAPI_PAGE_RETRIEVE',
				RETRIEVE_SUCCESS	: '_FBAPI_PAGE_RETRIEVE_SUCCESS',
				RETRIEVE_ERROR		: '_FBAPI_PAGE_RETRIEVE_ERROR',
			}
		}
	}
});