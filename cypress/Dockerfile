FROM redhat/ubi8:8.9

COPY cypress/install-cypress-dependencies.sh /

# Prepare working directory
RUN mkdir -p hmda-frontend/cypress/downloads hmda-frontend/cypress/screenshots hmda-frontend/cypress/videos hmda-frontend/cypress/integration hmda-frontend/cypress/fixtures \
             src/common src/filing/api/ src/filing/utils/ src/tools/larft/config/

# Install node & yarn, Integrate additional dependency source repositories
RUN dnf -y update \
 && dnf -y module install nodejs:18 \
 && npm install -g npm@latest \
 && npm install yarn -g \
 && dnf -y install --nogpgcheck https://dl.fedoraproject.org/pub/epel/epel-release-latest-$(rpm -E %rhel).noarch.rpm \
 && dnf -y install --nogpgcheck https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-$(rpm -E %rhel).noarch.rpm \
 && dnf -y install --nogpgcheck https://rpms.remirepo.net/enterprise/remi-release-$(rpm -E %rhel).rpm \
 && rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org \
 && rpm -Uvh https://www.elrepo.org/elrepo-release-8.el8.elrepo.noarch.rpm \
 && yum -y install http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm \
 && yum -y install http://mirror.ghettoforge.org/distributions/gf/gf-release-latest.gf.el8.noarch.rpm \
 && /bin/sh install-cypress-dependencies.sh \
 && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
 && unzip awscliv2.zip \
 && ./aws/install \
 && rm -rf /usr/local/share/.cache/yarn/v6/npm-public-encrypt-*/node_modules/public-encrypt/test/* \
 && rm -rf /root/.cache/Cypress/**/Cypress/resources/app/node_modules/public-encrypt/test/* \
 && rm -rf /root/.cache/Cypress/**/Cypress/resources/app/node_modules/http-proxy/test/* \
 && rm -rf /root/.cache/Cypress/**/Cypress/resources/app/node_modules/lazystream/secret

WORKDIR /hmda-frontend/

# Copy Cypress support files
COPY cypress/support cypress/support
COPY cypress/plugins cypress/plugins
COPY cypress/docker-runner.sh cypress/
COPY ./cypress.config.js ./

# Copy HMDA helper functions
COPY ../src/common/configUtils.js src/common/
COPY ../src/deriveConfig.js src/
COPY ../src/common/constants src/common/constants
COPY ../src/common/api/ src/common/
COPY ../src/filing/api src/filing/api
COPY ../src/filing/utils src/filing/utils
COPY ../src/tools/larft/config/ src/tools/larft/config/

# Enable creation of screenshots/videos
RUN useradd -M -d /hmda-frontend -s /bin/bash hmda_cypress_user \
 && chown -R hmda_cypress_user:hmda_cypress_user /hmda-frontend/
USER hmda_cypress_user

# Install Cypress + supporting libraries
COPY cypress/package.json ./
RUN yarn install

# Cleanup vulnerabilities (as hmda_cypress_user)
RUN rm -rf /hmda-frontend/node_modules/public-encrypt/test/* \
 && rm -rf /hmda-frontend/.cache/Cypress/**/Cypress/resources/app/node_modules/public-encrypt/test/* \
 && rm -rf /hmda-frontend/.cache/Cypress/**/Cypress/resources/app/node_modules/http-proxy/test/* \
 && rm -rf /hmda-frontend/.cache/Cypress/**/Cypress/resources/app/node_modules/lazystream/secret
