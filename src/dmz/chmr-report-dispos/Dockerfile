# Build Stage
FROM node:18-alpine

WORKDIR /app
COPY ./dmz/chmr-report-dispos/package*.json ./
RUN npm install && npm cache clean --force

COPY ./dmz/chmr-report-dispos/. .

COPY ./common/ ./common

EXPOSE 6000

CMD ["npm", "start"]
