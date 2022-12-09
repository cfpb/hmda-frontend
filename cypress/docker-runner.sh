#!/bin/bash
# Script that will post a message to a predefined webhook when cypress is done

# Import helper functions
. ./cypress/support/shell-helpers.sh

# Download Fixtures
curl https://s3.amazonaws.com/cfpb-hmda-public/prod/cypress/fixtures.zip > ./cypress/downloads/fixtures.zip \
	&& unzip -o cypress/downloads/fixtures.zip -d cypress/

# Download Integration tests
curl https://s3.amazonaws.com/cfpb-hmda-public/prod/cypress/e2e.zip > ./cypress/downloads/e2e.zip \
	&& unzip -o cypress/downloads/e2e.zip -d cypress/  

# Run configured Integration tests
# Example: "cypress/e2e/data-browser/**,cypress/e2e/data-publication/**"
if [[ -n "$CYPRESS_TEST_LIST" ]]; 
then
	yarn cypress run --spec ${CYPRESS_TEST_LIST} > output_integration.txt
	if  grep -q "All specs passed!" "output_integration.txt" ; then
		post_success 'Integration testing' "output_integration.txt"
	else
		post_failure 'Integration testing' "output_integration.txt"
	fi
fi

# Run Load tests, if enabled
if [ "$CYPRESS_SHOULD_LOAD_TEST" = true ];
then 
	yarn cypress run --spec "cypress/integration/load/**" > output_load.txt
	if  grep -q "All specs passed!" "output_load.txt" ; then
		post_success 'Load testing' "output_load.txt"
	else
		post_failure 'Load testing' "output_load.txt"
	fi
fi


cleanup