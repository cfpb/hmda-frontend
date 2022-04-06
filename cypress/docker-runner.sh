#!/bin/bash
# Script that will post a message to a predefined webhook when cypress is done

# Args
# 1 - Test collection label (Integration/Load)
# 2 - Filename
post_success() 
{
	runtime=$(tail -n 1 ${2} | xargs echo)
	
	msg="- [ [${environment}](${CYPRESS_HOST}) ] ${1}\n  - ${runtime} :1up:"

	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"${msg}\"}" $CYPRESS_WEB_HOOK

}

# Args
# 1 - Test collection label (Integration/Load)
# 2 - Filename
post_failure() 
{
	msg="- [ [${environment}](${CYPRESS_HOST}) ] ${1}\n  - Failed. :old-man-yells-at-cloud-simpsons:\n  - Check the logs\n    \`\`\`\n    kubectl logs \$(kubectl get pods -n monitoring --sort-by=.status.startTime | grep 'hmda-cypress-' | tail -n 1 | awk 'NR==1{print \$1}') -n monitoring\n    \`\`\`"

	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"${msg}\" }"  $CYPRESS_WEB_HOOK

	echo "\n\n--- ${1} output ---"
	cat $2
}

cleanup()
{
	rm output_load.txt
	rm output_integration.txt
}

if [[ "$CYPRESS_HOST" == *"ffiec.cfpb"* ]]; then
  environment="PROD"
elif [[ "$CYPRESS_HOST" == *"ffiec.beta"* ]]; then
  environment="BETA"
elif [[ "$CYPRESS_HOST" == *"hmda4.demo"* ]]; then
  environment="DEV"
else
  environment="DEV-BETA"
fi

# Integration tests
yarn cypress run --spec "cypress/integration/data-browser/**,cypress/integration/data-publication/**,cypress/integration/filing/**,cypress/integration/hmda-help/**,cypress/integration/tools/**" > output_integration.txt
if  grep -q "All specs passed!" "output_integration.txt" ; then
	post_success 'Integration testing :handshake:' "output_integration.txt"
else
	post_failure 'Integration testing :handshake:' "output_integration.txt"
fi

# Download Submission file for load testing 
[ ! -f ./cypress/fixtures/2020-FRONTENDTESTBANK9999-MAX.txt ] \
	&& curl https://s3.amazonaws.com/cfpb-hmda-public/prod/cypress/2020-LargeFiler.zip > ./cypress/fixtures/2020-LargeFiler.zip \
	&& tar -xvf cypress/fixtures/2020-LargeFiler.zip -C cypress/fixtures/

# Load test
yarn cypress run --spec "cypress/integration/load/**" > output_load.txt
if  grep -q "All specs passed!" "output_load.txt" ; then
	post_success 'Load testing :tractor:' "output_load.txt"
else
	post_failure 'Load testing :tractor:' "output_load.txt"
fi


cleanup