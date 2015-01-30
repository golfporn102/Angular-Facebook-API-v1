angular.module('app1', ['ngMaterial','ui.router']);

angular.module('app1').constant('events', {
	message : {
		_SERVER_REQUEST_STARTED 				: '_SERVER_REQUEST_STARTED',
		_SERVER_REQUEST_ENDED_  				: '_SERVER_REQUEST_ENDED_',
		_AUTHENTICATE_USER_LOGIN				: '_AUTHENTICATE_USER_LOGIN',
		_AUTHENTICATE_USER_LOGIN_SUCCESS		: '_AUTHENTICATE_USER_LOGIN_SUCCESS',
	}
});