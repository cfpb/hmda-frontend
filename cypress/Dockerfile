FROM centos:7

RUN yum -y update

RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -

# Install dependencies
RUN yum install -y xorg-x11-server-Xvfb
RUN yum install -y xorg-x11-xauth

RUN yum install -y gtk2-2.24*
RUN yum install -y gtk3-3.22*
RUN yum install -y gtk3-devel

RUN yum install -y libXtst*
# provides libXss
RUN yum install -y libXScrnSaver*
# provides libgconf-2
RUN yum install -y GConf2*
# provides libasound
RUN yum install -y alsa-lib*

RUN yum whatprovides libnss3.so
RUN yum install -y libnss3.so

# Install Node
RUN yum install -y epel-release
RUN yum install -y nodejs

RUN yum install -y wget
RUN yum install -y unzip

RUN npm install yarn -g

RUN mkdir -p ~/.cache/Cypress/6.4.0/Cypress && \
    wget --no-check-certificate http://download.cypress.io/desktop/6.4.0?platform=linux -O /tmp/z.$$ && \
    unzip -d ~/.cache/Cypress/6.4.0/ /tmp/z.$$ && \
    rm /tmp/z.$$ && \
    chmod +x ~/.cache/Cypress/6.4.0/Cypress/Cypress && \
    rm -rf /var/lib/apt/lists/*

COPY / hmda-frontend/

WORKDIR hmda-frontend/

RUN yarn
