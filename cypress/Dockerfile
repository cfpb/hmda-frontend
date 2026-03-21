# Install Cypress v15.12.0
FROM cypress/included:15.12.0
# Set working directory
WORKDIR /hmda-frontend

USER root
RUN apt-get update && apt-get install -y curl

COPY cypress/package.json ./

# Add Zscaler Root CA certificate
ADD https://raw.githubusercontent.com/cfpb/zscaler-cert/refs/heads/main/zscaler_root_ca.pem /usr/local/share/ca-certificates/zscaler-root-public.cert
ARG NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/zscaler-root-public.cert

# Install packages (--legacy-peer-deps added because of incompatibility with cypress-keycloak v2.0.2)
RUN npm install --loglevel verbose --legacy-peer-deps

# Manually install and replace cypress' version of esbuild to fix CVE-2025-68121/GO-2026-4337, a
# critical vulnerability in the crypto/tls library, see the issue at: https://pkg.go.dev/vuln/GO-2026-4337
# TODO: Remove the following RUN statement after Cypress patches it, see GHE #2711
RUN npm install @esbuild/linux-x64@0.27.4 --save-optional --legacy-peer-deps --loglevel verbose && \
    rm /root/.cache/Cypress/15.12.0/Cypress/resources/app/node_modules/@esbuild/linux-x64/bin/esbuild && \
    cp node_modules/@esbuild/linux-x64/bin/esbuild /root/.cache/Cypress/15.12.0/Cypress/resources/app/node_modules/@esbuild/linux-x64/bin/esbuild

# Manually install and replace cypress' version of undici to fix CVE-2026-1525, see the issue
# at: https://nvd.nist.gov/vuln/detail/CVE-2026-1525
# TODO: Remove the following RUN statement after Cypress patches it, see GHE #2711
RUN npm install undici@6.24.0 --save-optional --legacy-peer-deps --loglevel verbose && \
    rm -rf /root/.cache/Cypress/15.12.0/Cypress/resources/app/node_modules/undici && \
    cp -r node_modules/undici /root/.cache/Cypress/15.12.0/Cypress/resources/app/node_modules/undici

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