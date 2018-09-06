#!/bin/bash
if [ ! -d /usr/src/workspace ]   # for file "if [-f /home/rama/file]" 
then 
	mkdir /usr/src/workspace/public
	cp /tmp/public/* /usr/src/workspace/public
fi
npm start