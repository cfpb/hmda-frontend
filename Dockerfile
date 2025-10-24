FROM node:20-alpine3.22 as build-stage
WORKDIR /usr/src/app
ARG DOCKER_TAG="latest"

# updates pcre2 library to fix CVE-2025-58050 in alpine base image by updating it to at least 10.46-r0
RUN apk update && apk upgrade pcre2>=10.46

RUN --mount=type=secret,id=env_vars \
  cp /run/secrets/env_vars .env

# Resolves packageManager yarn issue in the package.json file
ENV SKIP_YARN_COREPACK_CHECK=0

# install build dependencies
COPY package.json .

# Using Yarn V4
RUN yarn set version 4.1.0

COPY yarn.lock .yarn .yarnrc.yml ./
RUN yarn install

# Copying all directories and subdirectories as Vite needs everything
COPY . .

RUN echo "{ \"version\": \"${DOCKER_TAG}\" }" > ./src/common/constants/release.json

RUN yarn build

FROM nginx:alpine3.22

# updates pcre2 library to fix CVE-2025-58050 in alpine base image by updating it to at least 10.46-r0
RUN apk update && apk upgrade pcre2>=10.46

ENV NGINX_USER=svc_nginx_hmda
RUN apk update && apk upgrade
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
RUN adduser -S $NGINX_USER nginx && \
    addgroup -S $NGINX_USER && \
    addgroup $NGINX_USER $NGINX_USER && \
    touch /run/nginx.pid && \
    chown -R $NGINX_USER:$NGINX_USER /etc/nginx /run/nginx.pid /var/cache/nginx/
EXPOSE 8080
USER svc_nginx_hmda
CMD ["nginx", "-g", "daemon off;"]
