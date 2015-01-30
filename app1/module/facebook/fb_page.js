(function() {
	
	var page = function(page) {
		
		var _page = page;
		
		this.CurrentPage = function( page ) {
			_page = page;
		}
		
		this.getCurrentPage = function() {
			return _page;
		}
		
		this.loadConversations = function( callback ) {
			
			var url = '/' + _page.id + '/conversations';
			var object = { 'access_token'  : _page.access_token };
			

			FB.api( url, object , function( response ) {
				console.group("== conversations ==");
				console.log( response );
				console.groupEnd();
				callback( response );
			});
		}

		this.addObjectInterlocutor = function ( conversation ) {
			
			var pages_id = facebook.getCurrentPage().id;
			
			var senders = conversation.senders.data;

			if( senders[0].id !== pages_id ) {
				conversation.interlocutor = senders[0];
			}
			else {
				conversation.interlocutor = senders[1];
			}
			return conversation;
		}
	}

})();