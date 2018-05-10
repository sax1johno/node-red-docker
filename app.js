/**
 * This is an express-powered node-red application bootstrap.  This spins
 * up the node-red server and allows us to use more precise settings control.
 **/
var http = require('http');
var express = require("express");
var RED = require("node-red"),
    app = express(),
    environment = app.settings.env,
    // bodyParser = require('body-parser'),
    _ = require('underscore'),
    pouch = require('pouchdb'),
    cote = require('cote');

var config = require("/usr/src/config/config.js");
try {
	var userConfig = require("/usr/src/workspace/config.js");
	config = _.extend(config, userConfig);
	console.info("Used User config file");
} catch (e) {
	console.info(e);
	// Do nothing - the user never supplied a "userConfig".
	console.info("User did not supply a configuration file");
}
app.use("/",express.static("/usr/src/workspace/public"));

// Create a server
var server = http.createServer(app);

var redConfig = config.nodered();
console.log("userDir = ", redConfig.userDir);

// Initialise the runtime with a server and settings
console.log("Node red config = ", redConfig);
RED.init(server,redConfig);

// Serve the editor UI from /red
if (redConfig.httpAdminRoot) {
    app.use(redConfig.httpAdminRoot,RED.httpAdmin);
}

app.use(function (req, res, next) {
	res.setHeader('X-Powered-By', 'Propl')
	next()
});

// Serve the http nodes UI from /api
app.use(redConfig.httpNodeRoot,RED.httpNode);
// app.use(bodyParser.json({limit: '5mb'}));

// X-Powered-By: Express
server.listen(config.main.port);
console.log("Listening on port ", config.main.port);
// Start the runtime

if (process.env.STORAGE == "pouch") {
    // var couch = require('nano')(redConfig.couchUrl);
    // appname = redConfig.couchAppname || require('os').hostname();
    // var dbname = redConfig.couchDb||"nodered";
    var remoteDb = new pouch(redConfig.couchUrl);
    var couchDb = new pouch(redConfig.pouchFile);
    // couchDb.db.list(function(error, databases) {
        // if (error) {
        //     console.error("Error finding databases");
        //     throw error;
        // }
        // if (databases.indexOf(dbname) <0 ) {
    // couchDb.db.create(dbname, function(error, body, headers) {
    //     if (error) {
    //         console.error("Unable to create new database");
    //         throw error;
    //     }
    // });
        // }
    // });
    // do one way, one-off sync from the server until completion
    // couchDb.replicate.from(remoteDb).on('complete', function(info) {
      // then two-way, continuous, retriable sync
        couchDb.sync(remoteDb, {
          live: true,
          retry: true
        }).on('change', function (change) {
            console.log("Detected change in the database");
            RED.nodes.loadFlows();
        // }).on('paused', function (info) {
          // replication was paused, usually because of a lost connection
          // console.error("Replication is paused");
        // }).on('active', function (info) {
          // replication was resumed
          // console.log("Replication was resumed from pause");
        }).on('error', function (err) {
          // totally unhandled error (shouldn't happen)
          console.error("An unhandled error occured:", err);
        });
    // }).on('error', function(err) {
        // console.error("Initial replication sync error occurred", err);
    // });;

}
// 	// var nano = require('nano')
// 	console.log("Listening to couch at ", redConfig.couchUrl);
//     var couch = require('nano')(redConfig.couchUrl);
//     appname = redConfig.couchAppname || require('os').hostname();
//     var dbname = redConfig.couchDb||"nodered";
//     // var follow = require('follow');
//     // follow(redConfig.couchUrl + "/" + dbname, function(error, change) {
//     // 	if (!error) {
// 	   //  	console.log("Change: ", change);
// 	   //  	console.log("would do a redeploy");
// 	   //  	RED.nodes.loadFlows();    		
//     // 	} else {
//     // 		console.error("An error occurred:", error);
//     // 	}
//     // });
//     var db = couch.use(dbname);


//     // Create database if it doesn't exist.
//     var feed = db.follow({"since": "now"});

//     feed.on('change', function(change) {
//     	console.log("Change: ", change);
//     	console.log("would do a redeploy");
//     	RED.nodes.loadFlows();
//     });

// 	feed.on('error', function(er) {
// 	  console.error('Since Follow always retries on errors, this must be serious');
// 	});

//     feed.follow();
// }

RED.start();
process.on('unhandledRejection', error => {
    // Handles this for now so the error message goes away.
  console.log('unhandledRejection', error);
});