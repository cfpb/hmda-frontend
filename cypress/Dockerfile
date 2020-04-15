# FROM node:12.14.1-alpine3.11 as build-stage

FROM node:lts-stretch-slim

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        libgtk2.0-0 \
        libgtk-3-0 \
        libnotify-dev \
        libgconf-2-4 \
        libnss3 \
        libxss1 \
        libasound2 \
        libxtst6 \
        xauth \
        xvfb \
        wget \
        unzip && \
    mkdir -p ~/.cache/Cypress/4.0.1/Cypress && \
    wget --no-check-certificate http://download.cypress.io/desktop/4.0.1?platform=linux -O /tmp/z.$$ && \
    unzip -d ~/.cache/Cypress/4.0.1/ /tmp/z.$$ && \
    rm /tmp/z.$$ && \
    chmod +x ~/.cache/Cypress/4.0.1/Cypress/Cypress && \
    apt-get purge -y \
        wget \
        unzip && \
    rm -rf /var/lib/apt/lists/*

# install build dependencies
copy / hmda-frontend/

<<<<<<< HEAD
RUN useradd cypress_user 
USER cypress_user
=======
# ENV CYPRESS_USER=cypress_user
# RUN adduser $CYPRESS_USER cypress && \
#     addgroup $CYPRESS_USER && \
#     addgroup $CYPRESS_USER $CYPRESS_USER
# USER cypress_user
>>>>>>> b7291b68d0a16b040dc04e884db8deae9aa14b6f

WORKDIR hmda-frontend/