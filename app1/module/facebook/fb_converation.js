facebook.loadReceive_message = function( conversation_id ,callback ) {
		var url = '/' + conversation_id + '/messages';
		var prem = { 'access_token'  : currentpage.access_token}
		
		FB.api( url , prem , function(response) {
			callback( response );
		})
	}

	facebook.send_message = function( conversation_id , message ,callback ) {
		console.log(message);
		var url = '/' + conversation_id + '/messages';
		var prem = {
			'message' : message, 
			'access_token'  : currentpage.access_token }
		
		FB.api( url , "POST",  prem , function(response) {
			facebook.loadReceive_message(conversation_id, callback);
		})
	}