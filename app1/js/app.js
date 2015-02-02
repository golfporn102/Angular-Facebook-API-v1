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
				INSERT		   	: '_DB_GROUP_INSERT',
				INSERT_SUCCESS 	: '_DB_GROUP_INSERT_SUCCESS',
				INSERT_ERROR	: '_DB_GROUP_INSERT_ERROR',
				UPDATE  		: '_DB_GROUP_UPDATE',
				DELETE  		: '_DB_GROUP_DELETE'
			}
		}
	}
});