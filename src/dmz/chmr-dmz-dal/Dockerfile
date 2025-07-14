FROM node:23-slim

RUN apt-get update -qq && \
apt-get install -y --no-install-recommends \
    ca-certificates tini && \
apt-get clean && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/tini", "--"]

WORKDIR /usr/server/app

COPY ./dmz/chmr-dmz-dal/package*.json ./

RUN npm ci --omit=dev && \
npm cache clean --force

COPY ./common/ ./common

COPY ./dmz/chmr-dmz-dal/. .

VOLUME ["/usr/server/app/files"]
EXPOSE 5000

CMD ["node", "server/server.js"]
