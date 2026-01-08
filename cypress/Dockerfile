# Install Cypress v14.3.0
FROM cypress/included:14.3.0

# Set working directory
WORKDIR /hmda-frontend

USER root
RUN apt-get update && apt-get install -y curl

COPY cypress/package.json ./

# Add Zscaler Root CA certificate
COPY zscaler-root-public.cert /usr/local/share/ca-certificates/
ARG NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/zscaler-root-public.cert
RUN npm install cypress@14.3.0 --save-dev --force --loglevel verbose
RUN npx cypress verify

# Prepare working directory
RUN mkdir -p cypress/downloads cypress/screenshots cypress/videos cypress/integration cypress/fixtures

# Copy Cypress support files
COPY cypress/e2e cypress/e2e
COPY cypress/fixtures cypress/fixtures
COPY cypress/support cypress/support
COPY cypress/plugins cypress/plugins
COPY cypress/docker-runner.sh cypress/
COPY ./cypress.config.js ./

# Copy HMDA helper functions
RUN mkdir -p src/common src/filing/api src/filing/utils src/tools/larft/config
COPY ../src/common/configUtils.js src/common/
COPY ../src/deriveConfig.js src/
COPY ../src/common/constants src/common/constants
COPY ../src/common/api/ src/common/api/
COPY ../src/filing/api src/filing/api
COPY ../src/filing/utils src/filing/utils
COPY ../src/tools/larft/config/ src/tools/larft/config/

# Copy package.json
COPY cypress/package.json ./

# Enable creation of screenshots/videos
RUN useradd -M -d /hmda-frontend -s /bin/bash hmda_cypress_user && \
  chown -R hmda_cypress_user:hmda_cypress_user /hmda-frontend/
USER hmda_cypress_user

# Set up the entrypoint
ENTRYPOINT ["npx", "cypress", "run"]