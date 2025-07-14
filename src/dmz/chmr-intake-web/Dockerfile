# Build Stage
FROM node:20-alpine AS build

WORKDIR /app
COPY ./dmz/chmr-intake-web/package*.json ./
RUN npm ci --omit=dev --loglevel=error \
 && npm install react-scripts --loglevel=error \
 && npm cache clean --force
RUN pwd

COPY ./common/ ./common
COPY ./dmz/chmr-intake-web/. .

RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./dmz/chmr-intake-web/nginx.conf /etc/nginx/nginx.conf
COPY ./dmz/chmr-intake-web/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]