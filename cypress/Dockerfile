ARG NODE_VERSION='20.9.0'
ARG CYPRESS_VERSION='13.3.1'

FROM cypress/base:${NODE_VERSION}

# Update npm to latest version
RUN npm install -g npm@latest

# Install necessary packages
RUN apt-get update && apt-get install -y curl unzip && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /hmda-frontend

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

# Install dependencies and Cypress, then clean up vulnerable packages
RUN npm install && \
    npx cypress install --version ${CYPRESS_VERSION} && \
    npx cypress verify

# Set up the entrypoint
ENTRYPOINT ["npx", "cypress", "run"]