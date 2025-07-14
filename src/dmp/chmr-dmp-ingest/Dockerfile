# Build Stage
FROM node:18-alpine

WORKDIR /app
COPY ./dmp/chmr-dmp-ingest/package*.json ./
RUN npm install && npm cache clean --force

COPY ./common/ ./common

COPY ./dmp/chmr-dmp-ingest/. .

EXPOSE 7642

CMD ["npm", "start"]
