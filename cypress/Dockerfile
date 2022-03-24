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

COPY / hmda-frontend/

WORKDIR /hmda-frontend/

RUN yarn

RUN useradd -ms /bin/bash hmda_cypress_user && \
  chown -R hmda_cypress_user:hmda_cypress_user /hmda-frontend/

USER hmda_cypress_user

RUN yarn cypress install

# Copy load-test file from S3 if not already present
RUN [ ! -f ./cypress/fixtures/2020-FRONTENDTESTBANK9999-MAX.txt ] && aws s3 cp s3://cfpb-hmda-public/cypress/2020-FRONTENDTESTBANK9999-MAX.txt ./cypress/fixtures/ --profile svc_hmda