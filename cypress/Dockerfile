FROM centos:7


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
