# build React
FROM node:20-alpine AS build
WORKDIR /app
COPY ./dmz/chmr-dmz-maint/package*.json ./
RUN npm ci --omit=dev --loglevel=error \
 && npm install react-scripts --loglevel=error \
 && npm cache clean --force
COPY ./dmz/chmr-dmz-maint/. .
RUN npm run build

# serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./dmz/chmr-dmz-maint/nginx.conf      /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

    