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
RED.start();

if (process.env.STORAGE == "couch") {
	console.log("Listening to couch at ", redConfig.couchUrl);
    var couch = require('nano')(redConfig.couchUrl);
    appname = redConfig.couchAppname || require('os').hostname();
    var dbname = redConfig.couchDb||"nodered";
    // var follow = require('follow');
    // follow(redConfig.couchUrl + "/" + dbname, function(error, change) {
    // 	if (!error) {
	   //  	console.log("Change: ", change);
	   //  	console.log("would do a redeploy");
	   //  	RED.nodes.loadFlows();    		
    // 	} else {
    // 		console.error("An error occurred:", error);
    // 	}
    // });
    var db = couch.use(dbname);
    var feed = db.follow({"since": "now"});

    feed.on('change', function(change) {
    	console.log("Change: ", change);
    	console.log("would do a redeploy");
    	RED.nodes.loadFlows();
    });

	feed.on('error', function(er) {
	  console.error('Since Follow always retries on errors, this must be serious');
	  throw er;
	});

    feed.follow();
}

