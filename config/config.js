/**
 * Configuration for all plugins goes in this file.  The name of this file
 * represents the environment for which this configuration belongs, with
 * the following file naming convention:
 *  config.<environment>.js
 *
 * The config object itself is just a set of key/value pairs, with the key representing
 * the name of the plugin and the value representing configuration options.
 *
 * See the documentation for each individual plugin for more information on what
 * options can be included here.
 **/

const bcrypt = require('bcryptjs'),
    path = require('path'),
    fs = require('fs'),
    Influx = require('influx'),
    os = require('os');

// var passwd = process.env.HASHED_ADMIN_PASSWORD || bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);

var title = process.env.EDITOR_TITLE || "Propl Flow Editor for " + process.env.APP_NAME

module.exports = {
  appName: process.env.APP_NAME,
  main: {
    port:process.env.PORT
  },
  auth: {
    // change to true if you want to send emails
    sendemail:false
  },
  nodered: function() {
    var returnObj = {
        mongoAppname: process.env.MONGO_APPNAME,
        couchAppname: process.env.COUCH_APPNAME,        
        mongoCollection: process.env.MONGO_COLLECTION,
        couchCollection: process.env.COUCH_COLLECTION,
        mongoUrl: process.env.MONGO_DATABASE_URL,
        couchUrl: process.env.COUCH_DATABASE_URL,
        pouchFile: process.env.POUCH_DATABASE_FILE,
        // credentialSecret: process.env.CREDENTIALS_SECRET || false,        
        // the tcp port that the Node-RED web server is listening on
        uiPort: 1880,
        // Retry time in milliseconds for MQTT connections
        mqttReconnectTime: 15000,
        // Retry time in milliseconds for Serial port connections
        serialReconnectTime: 15000,
        // The maximum length, in characters, of any message sent to the debug sidebar tab
        debugMaxLength: 1000,

        bodyParserLimit: "10mb",

        // By default, all user data is stored in the Node-RED install directory. To
        // use a different location, the following property can be used
        userDir: process.env.USERDIR || "/usr/src/flows",

        // Node-RED scans the `nodes` directory in the install directory to find nodes.
        // The following property can be used to specify an additional directory to scan.
        // nodesDir: "/usr/src/nodes",

        // By default, the Node-RED UI is available at http://localhost:1880/
        // The following property can be used to specifiy a different root path.
        // If set to false, this is disabled.
        httpAdminRoot: process.env.HTTP_ADMIN_ROOT,

        // Some nodes, such as HTTP In, can be used to listen for incoming http requests.
        // By default, these are served relative to '/'. The following property
        // can be used to specifiy a different root path. If set to false, this is
        // disabled.
        httpNodeRoot: process.env.HTTP_NODE_ROOT,

        // The following property can be used in place of 'httpAdminRoot' and 'httpNodeRoot',
        // to apply the same root to both parts.
        //httpRoot: '/red',

        // When httpAdminRoot is used to move the UI to a different root path, the
        // following property can be used to identify a directory of static content
        // that should be served at http://localhost:1880/.
        httpStatic: "/usr/src/public",

        // Securing Node-RED
        // -----------------
        // To password protect the Node-RED editor and admin API, the following
        // property can be used. See http://nodered.org/docs/security.html for details.

        // adminAuth: require("./user_authentication")(seneca),

        editorTheme: {
            page: {
                title: title
            },
            header: {
                title: title,
                image: "/usr/src/images/propllight50x50.png",
                url: process.env.TITLE || "https://www.propl.us"
            },
            login: {
                image: "/usr/src/images/propl256x256.png" // a 256x256 image
            },
            menu: {
                "menu-item-help": {
                    "label": "Propl",
                    "url": "https://docs.propl.us"
                }
            }
        },
        // The maximum size of HTTP request that will be accepted by the runtime api.
        // Default: 5mb
        apiMaxLength: '10mb',


        // To password protect the node-defined HTTP endpoints (httpNodeRoot), or
        // the static content (httpStatic), the following properties can be used.
        // The pass field is a bcrypt hash of the password.
        // See http://nodered.org/docs/security.html#generating-the-password-hash
        //httpNodeAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},
        //httpStaticAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},

        // The following property can be used to enable HTTPS
        // See http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
        // for details on its contents.
        // See the comment at the top of this file on how to load the `fs` module used by
        // this setting.
        //
        //https: {
        //    key: fs.readFileSync('privatekey.pem'),
        //    cert: fs.readFileSync('certificate.pem')
        //},

        // The following property can be used to disable the editor. The admin API
        // is not affected by this option. To disable both the editor and the admin
        // API, use either the httpRoot or httpAdminRoot properties
        disableEditor: process.env.DISABLE_EDITOR || false,

        // The following property can be used to configure cross-origin resource sharing
        // in the HTTP nodes.
        // See https://github.com/troygoode/node-cors#configuration-options for
        // details on its contents. The following is a basic permissive set of options:
        //httpNodeCors: {
        //    origin: "*",
        //    methods: "GET,PUT,POST,DELETE"
        //},

        // If you need to set an http proxy please set an environment variable
        // called http_proxy (or HTTP_PROXY) outside of Node-RED in the operating system.
        // For example - http_proxy=http://myproxy.com:8080
        // (Setting it here will have no effect)
        // You may also specify no_proxy (or NO_PROXY) to supply a comma separated
        // list of domains to not proxy, eg - no_proxy=.acme.co,.acme.co.uk

        // The following property can be used to add a custom middleware function
        // in front of all http in nodes. This allows custom authentication to be
        // applied to all http in nodes, or any other sort of common request processing.
        // httpNodeMiddleware: function(req,res,next) {
        //  next();
        // },

        // Anything in this hash is globally available to all functions.
        // It is accessed as context.global.
        // eg:
        functionGlobalContext: {
            os:require('os'),
            _: require('underscore'),
            moment: require('moment-timezone'),
            require: require
        },

        contextStorage: {
           default: {
               module: "localfilesystem"
           }
        },

        // can be accessed in a function block as:
        //    context.global.os

        // functionGlobalContext: {
            // os:require('os'),
            // octalbonescript:require('octalbonescript'),
            // jfive:require("johnny-five"),
            // j5board:require("johnny-five").Board({repl:false})
        // },

        // The following property can be used to order the categories in the editor
        // palette. If a node's category is not in the list, the category will get
        // added to the end of the palette.
        // If not set, the following default order is used:
        //paletteCategories: ['subflows', 'input', 'output', 'function', 'social', 'mobile', 'storage', 'analysis', 'advanced'],

        // Configure the logging output
        logging: {
            // Only console logging is currently supported
            console: {
                // Level of logging to be recorded. Options are:
                // fatal - only those errors which make the application unusable should be recorded
                // error - record errors which are deemed fatal for a particular request + fatal errors
                // warn - record problems which are non fatal + errors + fatal errors
                // info - record information about the general running of the application + warn + error + fatal errors
                // debug - record information which is more verbose than info + info + warn + error + fatal errors
                // trace - record very detailed logging + debug + info + warn + error + fatal errors
                level: process.env.LOG_LEVEL,

                // Whether or not to include metric events in the log output
                metrics: process.env.LOG_METRICS,
                // Whether or not to include audit events in the log output
                audit: process.env.LOG_AUDIT
            }
        },
        swagger: {
          "template": {
            "swagger": "2.0",
            "info": {
              "title": process.env.APP_NAME,
              "version": process.env.APP_VERSION
            }
          }
        }
      }
    if (process.env.LOG_INFLUX) {
        returnObj.logging.influx = {
                level: process.env.LOG_LEVEL,

                // Whether or not to include metric events in the log output
                metrics: process.env.LOG_METRICS,
                // Whether or not to include audit events in the log output
                audit: process.env.LOG_AUDIT,
                handler: function(settings) {
                    const influx = new Influx.InfluxDB(process.env.LOG_INFLUX_URL);

                    // influx.createDatabase("logs").then(function() {
                    //     console.log("Created logs database");
                    // }, function(e) {
                    //     console.log("Error trying to create database: ", e)
                    // });
                    // const influx = new Influx.InfluxDB({
                    //      host: process.env.LOG_INFLUX_HOST,
                    //      database: process.env.LOG_INFLUX_DATABASE,
                    //      schema: [
                    //        {
                    //          measurement: 'node-red-logs',
                    //          fields: {
                    //            message: Influx.FieldType.STRING,
                    //          },
                    //          tags: [
                    //            'host'
                    //          ]
                    //        }
                    //      ]
                    //     });
                    return function(msg) {
                        var message =   {
                            measurement: process.env.APP_NAME + "logs",
                            tags: { 
                                host: os.hostname(),
                                level: msg.level,
                                type: msg.type,
                            },
                            fields: { message: JSON.stringify(msg.msg), name: msg.name || "" },
                        }
                        // var message = {
                        //     '@tags': ['node-red', 'test'],
                        //     '@fields': msg,
                        //     '@timestamp': (new Date(msg.timestamp)).toISOString()
                        // }
                        try {
                            influx.writePoints([
                                message
                            ]).then(function(data) {
                                console.log(data);
                                // console.log("Would have logged a message");
                                // Do nothing for now - console logger will pick this up.
                            }, function(err) {
                                console.log("Failed to log message to influx: ", err);
                            })
                        } catch(err) { 
                            console.log(err);
                        }
                    }
                }
        }
    }

    returnObj.nodesDir = process.env.NODE_INSTALL_DIR;
    returnObj.userDir = process.env.FLOW_STORAGE_DIRECTORY;

    if (process.env.STORAGE == "mongo") {
        returnObj.storageModule = require("./mongostorage");
    }
    else if (process.env.STORAGE == "couch") {
        returnObj.storageModule = require("./couchstorage");
    } else if (process.env.STORAGE == "pouch") {
        returnObj.credentialSecret = false;
        returnObj.storageModule = require("./pouchstorage");        
    } else {
        // The file containing the flows. If not set, it defaults to flows_<hostname>.json
        returnObj.flowFile = process.env.FLOW_FILE;
        returnObj.flowFilePretty= true;
    }
    if (process.env.LOG_AUDIT) {
        returnObj.logging.console.audit = true;
    }
    if (process.env.LOG_METRICS) {
        returnObj.logging.console.metrics = true;
    }

    if (process.env.PROJECTS) {
        returnObj.editorTheme.projects = {
            "enabled": true
        }
    }
    
    // TODO: Make themes selectable with environment variable.
    // For now, dark theme is the default.    
    returnObj.editorTheme.page.css = "/usr/src/styles/propl-dark/midnight.css";
    returnObj.editorTheme.page.scripts = "/usr/src/styles/propl-dark/theme-tomorrow.js"

    if (process.env.AUTH_GITHUB) {
        let users = JSON.parse(process.env.AUTH_GITHUB_USERS_JSON);
        returnObj.adminAuth = require('node-red-auth-github')({
            clientID: process.env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
            baseURL: process.env.AUTH_GITHUB_BASE_URL,
            users: users
        });

    } else {
        let users = JSON.parse(process.env.AUTH_USERS);
        for (var i = 0; i < users.length; i++) {
            users[i].password = bcrypt.hashSync(users[i].password, 10);
        }
        returnObj.adminAuth = {
            type: "credentials",
            users: users
        }
    }


    
    return returnObj;
  }
};
