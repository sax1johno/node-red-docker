Node-RED Docker Base
=======
This is a docker container that makes administering Node-RED much simpler.  It provides several features of the standard base container, including the following:
* Configuration changes can be made via Environment Variable
* Built-in MongoDB storage module (and more in the future)
* A "workspace" volume for mounting files into your Node-RED instance (including configuration files)
* Automatically serves static content from a "public" folder in the "workspace" so you can expose resources publicly if you choose to.
* Many more improvements.

# Configuring Node-RED
Configuration can be done in 2 ways - you can either mount the "workspace" volume and edit the "settings.js" file directly, or you can configure the pre-defined settings using environment variables.

Below is a list of the environment variables you can use to configure the base instance:

| Variable  | Default           | Possible Options  | Short Description |
| ------------- |:-------------:| -----:| ------:|
| APP_NAME      | myapp | Any string | Gives your application a name in the system.  Used to generate default flow file names and other funn stuff.
| APP_VERSION      | 0.0.1      |   <major>.<minor>.<patch> | Allows you to specify a version number for your application.  Useful when debugging.
| HTTP_ADMIN_ROOT | /system/admin      |    Any valid absolute path name | Specify which path the flow editor will be served from
| HTTP_NODE_ROOT | /      |    Any valid absolute path name | Specify which path will the the base path for all URL's specified in a Node-RED node.
| ADMIN_USERNAME | admin      |    any valid unix username | The admin username you'll use to log into the system (uses basic auth)
| HASHED_ADMIN_PASSWORD | (null)      |  bcrypt hash of the users password | Sets the admin password for your login - stored as a bcrypt hash
| ADMIN_PASSWORD | (null )      |    Any Valid Password | (deprecated) Sets the  admin password for your login.  For better security, use the HASHED_ADMIN_PASSWORD instead.
| LOG_LEVEL | debug      |   [fatal\|error\| warn\|info\|debug\|trace\|]  | Specify how granular you want the logs to be
| LOG_METRICS | false      |   [true\|false] | If true, logs out metrics data as well as the given log level data
| LOG_AUDIT | false     |    [true\|false] | if true, logs out audit trail data as well as the given log info.
| FLOW_NAME | $APP_NAME     |    Any valid string  | Provides the name for the flow file if using flat-file / JSON storage to store your flows
| STORAGE | [mongo] | Currently only mongo or nothing | If empty, this will store flows in the /usr/src/flows volume.  If "mongo" and at LEAST the MONGO_DATABASE_URL is set, will store flows in a mongo database.
| MONGO_APPNAME | $APP_NAME     |    Any valid string | Gives a name to this application in MongoDB. Allows you to store multiple node-red flows within the same MongoDB collection.
| MONGO_COLLECTION | ${APP_NAME}_flows     |    Any valid MongoDB collection name | Specifies which MongoDB collection to store the flows in for this application.  Defaults to the name of your application with _flows afterward, so by default all applications store their flows in a different collection. 
| MONGO_DATABASE_URL | mongodb://db/ |    Any valid MongoDB connection string | Specifies a connection string for connecting to MongoDB.  By default, assumes there is a linked container with a service called "db" running MongoDB.  This can be changed to any valid MongoDB database connection string, and can be used with ?ssl and ?replset options.
| COUCH_APPNAME | $APP_NAME | Any valid string | Gives a name to this application in CouchDB. Allows you to store multiple node-red flows within the same CouchDB collection.  If storage method is POUCH, then this also the name of the application in PouchDB.
| COUCH_COLLECTION | ${APP_NAME}_flows | Any valid CouchDB collection name | Specifies which CouchDB or PouchDB collection to store the flows in for this application.  Defaults to the name of your application with _flows afterward, so by default all applications store their flows in a different collection.  If you're using PouchDB, this is also the name of the Pouch DB file.
| COUCH_DATABASE_URL | http://couchdb:5984/${COUCH_COLLECTION} | Any Valid URI or CouchDB connection string | Specifies a connection string for connecting to CouchDB.  By default, assumes there is a linked container with a service called "couchdb" running Couch.  This can be changed to any valid CouchDB database connection string.  If the STORAGE variable is POUCH, then this is the path of the CouchDB database that PouchDB syncs with.
| USERDIR | /usr/src/flows | Any absolute path (URI) | Specifies the location in the file system that installed nodes and flows will be saved.  Mount this in a persistent storage area to make installed modules and saved flows persist across instances

# LICENSE
MIT License (see LICENSE file for detials).  Copyright (C) 2017, John O'Connor



