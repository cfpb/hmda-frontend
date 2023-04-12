#!/bin/bash
# Script that will post a message to a predefined webhook when cypress is done

# Import helper functions
. ./cypress/support/shell-helpers.sh

# Download Fixtures
curl https://s3.amazonaws.com/cfpb-hmda-public/prod/cypress/fixtures.zip > ./cypress/downloads/fixtures.zip \
	&& unzip -o cypress/downloads/fixtures.zip -d cypress/

# Download e2e tests
curl https://s3.amazonaws.com/cfpb-hmda-public/prod/cypress/e2e.zip > ./cypress/downloads/e2e.zip \
	&& unzip -o cypress/downloads/e2e.zip -d cypress/  

# Run configured e2e tests
# Example: "cypress/e2e/data-browser/**,cypress/e2e/data-publication/**"
if [[ -n "$CYPRESS_TEST_LIST" ]]; 
then
	yarn cypress run --spec ${CYPRESS_TEST_LIST} > output_e2e.txt
	if  grep -q "All specs passed!" "output_e2e.txt" ; then
		post_success 'e2e testing' "output_e2e.txt"
	else
		post_failure 'e2e testing' "output_e2e.txt"
	fi
fi

# Run Load tests, if enabled
if [ "$CYPRESS_SHOULD_LOAD_TEST" = true ];
then 
	yarn cypress run --spec "cypress/e2e/load/**" > output_load.txt
	if  grep -q "All specs passed!" "output_load.txt" ; then
		post_success 'Load testing' "output_load.txt"
	else
		post_failure 'Load testing' "output_load.txt"
	fi
fi


cleanup