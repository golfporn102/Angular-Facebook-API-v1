angular.module('app1').factory('parseDB_riud', function (events, messaging) {

	var parseSavingObjects = function (parseclass, data, callback) {
		var ObjectDB = Parse.Object.extend( parseclass );
		var objectDB = new ObjectDB();

		objectDB.save( data , {
			success: function (objectDB) {
				callback( objectDB );
			},
			error: function (objectDB, error) {
				alert('Failed to create new object, with error code: ' + error.message);
			}
		});
	
	};

	var parseRetrievingObject = function (parseclass, callback) {
		var ObjectDB = Parse.Object.extend( parseclass );
		var objectDB = new Parse.Query( ObjectDB );
		console.log( objectDB);
		objectDB.find( {
			success: function (objectDB) {
				callback( objectDB )
			},
			error: function (object, error) {
				alert(error);
			}
		} );
	};

	
	// ==============  insert update date retrieve Parse =========================
	var insertDataToGroupTable = function (data) {
		var object = 'Group';
		
		parseSavingObjects( object, data, function(results) {
			console.log(results);
			messaging.publish(events.DB.GROUP.message.INSERT_SUCCESS, [results]);
		});
	};

	var retrieveDataFromGroupTable = function () {
		var object = 'Group';

		parseRetrievingObject( object, function (results) {
			messaging.publish(events.DB.GROUP.message.RETRIEVE_SUCCESS, [results]);
		});
	};

	var insertDataToPageTable = function (data) {
		var object = 'Page';

		parseSavingObjects( object, data, function (results) {
			messaging.publish( events.DB.PAGE.message.RETRIEVE_SUCCESS, [results] );
		});
	};

	var retrieveDataFromPageTable = function () {
		var object = 'Page';

		parseRetrievingObject( object, function (results) {
			messaging.publish(events.DB.PAGE.message.RETRIEVE_SUCCESS, [results]);
		});
	};

	var service = {
		parseSavingObjects 			: parseSavingObjects,
		parseRetrievingObject		: parseRetrievingObject,
		insertDataToGroupTable 		: insertDataToGroupTable,
		retrieveDataFromGroupTable	: retrieveDataFromGroupTable,
		insertDataToPageTable		: insertDataToPageTable,
		retrieveDataFromPageTable 	: retrieveDataFromPageTable,

	}
	return service;	
});