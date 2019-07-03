#!/bin/bash
if [ ! -d /usr/src/workspace/public ]   # for file "if [-f /home/rama/file]" 
then 
	 mkdir /usr/src/workspace/public
	#cp /tmp/public/* /usr/src/workspace/public
fi

if [ ! -f /usr/src/workspace/public/index.html ] && [ ! -e "NO_INDEX" ]
	then
		cp /tmp/public/index.html /usr/src/workspace/public/index.html
fi

if [ ! -f /usr/src/workspace/404.html ]
	then
		cp /tmp/public/404.html /usr/src/workspace/404.html
fi

if [ ! -f /usr/src/workspace/500.html ]
	then
		cp /tmp/public/500.html /usr/src/workspace/500.html
fi

if [ ! -f /usr/src/workspace/config.js ]
	then 
		cp /usr/src/config/config-override.js /usr/src/workspace/config.js
fi

if [ ! -f /usr/src/workspace/app.js ]
	then
		cp /usr/src/config/app-override.js /usr/src/workspace/app.js
fi

if [ -f /usr/src/workspace/package.json ]
then
	cp /usr/src/workspace/package.json /tmp/package.json && cd /tmp && npm install && cp -a /tmp/node_modules /usr/src/ 
fi

cd /usr/src && npm start