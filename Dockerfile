FROM node:carbon

# Copy package.json and install dependencies
COPY package.json /tmp/package.json
RUN cd /tmp && npm install

# copy the source code and webapp to the webapp folder, along with already-installed node modules.
RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/
RUN mkdir -p /usr/src/config && mkdir -p /usr/src/public && mkdir -p /usr/src/flows

COPY package.json /usr/src
COPY app.js /usr/src
COPY public /usr/src/workspace
COPY config /usr/src/config
COPY flows /usr/src/flows
COPY images /usr/src/images

VOLUME /usr/src/flows
VOLUME /usr/src/workspace

ENV PORT 80
ENV APP_NAME myapp
ENV APP_VERSION 0.0.1
ENV FLOW_COLLECTION $APP_NAME
ENV HTTP_ADMIN_ROOT /system/admin
ENV HTTP_NODE_ROOT /
ENV ADMIN_USERNAME admin
ENV ADMIN_PASSWORD changeme
ENV LOG_LEVEL debug
ENV LOG_METRICS ""
ENV LOG_AUDIT ""
ENV FLOW_NAME $APP_NAME
ENV MONGO_APPNAME $APP_NAME
ENV MONGO_COLLECTION ${APP_NAME}_flows
ENV MONGO_DATABASE_URL mongodb://db/
ENV COUCH_APPNAME $APP_NAME
ENV COUCH_COLLECTION ${APP_NAME}_flows
ENV COUCH_DATABASE_URL http://couchdb:5984
ENV LOG_INFLUX_URL http://influx
ENV POUCH_DATABASE_FILE  /usr/src/flows

EXPOSE $PORT
WORKDIR /usr/src

CMD ["npm", "start"]
