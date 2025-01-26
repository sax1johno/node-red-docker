FROM node:lts

# Copy package.json and install dependencies
COPY libs /tmp/libs
COPY package.json /tmp/package.json
# RUN npm install -g recursive-install grunt \
#		&& cd /tmp/libs/node-red \
#		&& npm install \
#		&& npm run build \
#		&& cd ../../ \
#		&& npm install

RUN cd /tmp \
	&& npm install

# copy the source code and webapp to the webapp folder, along with already-installed node modules.
RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/ && cp -a /tmp/libs /usr/src
RUN mkdir -p /usr/src/config && mkdir -p /usr/src/public && mkdir -p /usr/src/flows && mkdir -p /temp/public

COPY package.json /usr/src
COPY app.js /usr/src
COPY start.sh /usr/src
COPY public /tmp/public
COPY config /usr/src/config
COPY flows /usr/src/flows
COPY styles /usr/src/styles
COPY images /usr/src/images

VOLUME /usr/src/flows
VOLUME /usr/src/workspace
RUN ln -s /usr/src/workspace /workspace


ENV PORT 80
ENV APP_NAME myapp
ENV APP_VERSION 0.0.1
ENV FLOW_COLLECTION $APP_NAME
ENV HTTP_ADMIN_ROOT /system/admin/
ENV HTTP_NODE_ROOT /
ENV ADMIN_USERNAME admin
ENV ADMIN_PASSWORD changeme
ENV AUTH_USERS "[{\"username\": \"admin\",\"password\": \"changeme\",\"permissions\": \"*\"}]"
ENV LOG_LEVEL debug
ENV LOG_METRICS ""
ENV LOG_AUDIT ""
ENV FLOW_NAME $APP_NAME
ENV MONGO_APPNAME $APP_NAME
ENV MONGO_COLLECTION ${APP_NAME}_flows
ENV MONGO_DATABASE_URL mongodb://db/
ENV COUCH_APPNAME $APP_NAME
ENV COUCH_COLLECTION ${APP_NAME}_flows
ENV COUCH_DATABASE_URL http://couchdb:5984/${COUCH_COLLECTION}
ENV LOG_INFLUX_URL http://influx
ENV POUCH_DATABASE_FILE  /usr/src/flows
ENV FLOW_STORAGE_DIRECTORY /usr/src/workspace
ENV FLOW_FILE ${APP_NAME}_flows.json
ENV NODE_INSTALL_DIR /usr/src/workspace
ENV PROJECTS ""
ENV AUTH_GITHUB ""
ENV AUTH_GITHUB_USERS_JSON "[{\"username\": \"your_admin_user\",\"permissions\": [\"*\"]}]"
ENV AUTH_GITHUB_CLIENT_ID ""
ENV AUTH_GITHUB_CLIENT_SECRET ""
ENV AUTH_GITHUB_BASE_URL ""
ENV NODE_ENV ""

EXPOSE $PORT
WORKDIR /usr/src

CMD ["/bin/sh", "start.sh"]
