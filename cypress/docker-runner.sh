#!/bin/bash
# Script that will post a message to a predefined webhook when cypress is done

# Import helper functions
. ./cypress/support/shell-helpers.sh

# Download Docusaurus test file
mkdir -p cypress/e2e/docusaurus
curl https://raw.githubusercontent.com/cfpb/hmda-combined-documentation/main/cypress/e2e/documentation.cy.js > cypress/e2e/docusaurus/documentation.cy.js

# Run configured e2e tests
# Example: "cypress/e2e/data-browser/**,cypress/e2e/data-publication/**"
if [[ -n "$CYPRESS_TEST_LIST" ]]; 
then
	yarn cypress run --spec ${CYPRESS_TEST_LIST} 2>&1 | tee  output_e2e.txt
	if  grep -q "All specs passed!" "output_e2e.txt" ; then
		post_success 'e2e testing' "output_e2e.txt"
	else
		post_failure 'e2e testing' "output_e2e.txt"
	fi
fi

# Run Docusaurus e2e test and display results
# Only run Docusaurus in production
if [[ "$CYPRESS_HOST" == *"ffiec.cfpb"* ]];
then
	yarn cypress run --spec "cypress/e2e/docusaurus/**" 2>&1 | tee  output_docusaurus_e2e.txt
	if grep -q "All specs passed!" "output_docusaurus_e2e.txt" ; then
		post_success 'Docusaurus e2e testing' "output_docusaurus_e2e.txt"
	else
		post_failure 'Docusaurus e2e testing' "output_docusaurus_e2e.txt"
	fi
fi

# Run Load tests, if enabled
if [ "$CYPRESS_SHOULD_LOAD_TEST" = true ];
then 
	LOAD_FILE="cypress/fixtures/2022-FRONTENDTESTBANK9999-MAX.txt"
	LINE_COUNT=$(wc -l ${LOAD_FILE} | cut -d ' ' -f 1)
	if [[ ${LINE_COUNT} -eq 494101 ]]
	then
		echo "reducing load test file to 150k records"
		head -n 150001 ${LOAD_FILE} > tmp.txt
		sed -i 's/494100/150000/' tmp.txt
		mv tmp.txt ${LOAD_FILE}
	fi
	yarn cypress run --spec "cypress/e2e/load/**" 2>&1 | tee output_load.txt
	if  grep -q "All specs passed!" "output_load.txt" ; then
		post_success 'Load testing' "output_load.txt"
	else
		post_failure 'Load testing' "output_load.txt"
	fi
fi


cleanup