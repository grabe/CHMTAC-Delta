FROM node:23-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        ca-certificates tini && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/tini", "--"]

WORKDIR /usr/server/app

COPY ./dmp/chmr-dmp-api/package*.json ./

RUN npm ci --omit=dev && \
    npm cache clean --force

COPY ./dmp/chmr-dmp-api/. .

COPY ./common/ ./common

EXPOSE 8369

CMD ["node", "server.js"]
    