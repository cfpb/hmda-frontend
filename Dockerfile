FROM node:16.20-alpine3.17 as build-stage
WORKDIR /usr/src/app
ARG DOCKER_TAG="latest"

# install build dependencies
COPY package.json yarn.lock .yarnrc ./
# install packages offline
COPY npm-packages-offline-cache ./npm-packages-offline-cache
RUN yarn install

# create react app needs src and public directories
COPY src ./src
COPY public ./public

RUN echo "{ \"version\": \"${DOCKER_TAG}\" }" > ./src/common/constants/release.json

RUN yarn build

FROM nginx:1.25.2-alpine
ENV NGINX_USER=svc_nginx_hmda
RUN apk update; apk upgrade
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
RUN adduser -S $NGINX_USER nginx && \
    addgroup -S $NGINX_USER && \
    addgroup $NGINX_USER $NGINX_USER && \
    touch /run/nginx.pid && \
    chown -R $NGINX_USER:$NGINX_USER /etc/nginx /run/nginx.pid /var/cache/nginx/
EXPOSE 8080
USER svc_nginx_hmda
CMD ["nginx", "-g", "daemon off;"]
