# FROM node:12.14.1-alpine3.11 as build-stage

# FROM node:lts-stretch-slim

# FROM centos:7

# RUN apt-get update && \
#    apt-get install --no-install-recommends -y \
#        libgtk2.0-0 \
#        libgtk-3-0 \
#        libnotify-dev \
#        libgconf-2-4 \
#        libnss3 \
#        libxss1 \
#        libasound2 \
#        libxtst6 \
#        xauth \
#        xvfb \
#        wget \
#        unzip && \

FROM centos:7

# To find which package provides missing dependency, for example libXss.so
#   yum whatprovides libXss*
# and then install displayed answer like
#   yum install -y libXScrnSaver*

# Install dependencies
RUN yum install -y xorg-x11-server-Xvfb
RUN yum install -y gtk2-2.24*
RUN yum install -y libXtst*
# provides libXss
RUN yum install -y libXScrnSaver*
# provides libgconf-2
RUN yum install -y GConf2*
# provides libasound
RUN yum install -y alsa-lib*
RUN yum install -y gtk3-devel

# Install Node
RUN yum install -y epel-release

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

RUN yum install -y wget
RUN yum install -y unzip

RUN npm install yarn -g

RUN mkdir -p ~/.cache/Cypress/4.0.1/Cypress && \
    wget --no-check-certificate http://download.cypress.io/desktop/4.0.1?platform=linux -O /tmp/z.$$ && \
    unzip -d ~/.cache/Cypress/4.0.1/ /tmp/z.$$ && \
    rm /tmp/z.$$ && \
    chmod +x ~/.cache/Cypress/4.0.1/Cypress/Cypress && \
    rm -rf /var/lib/apt/lists/*

copy / hmda-frontend/

WORKDIR hmda-frontend/

RUN yarn
