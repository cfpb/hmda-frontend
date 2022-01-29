#!/bin/bash
# Script that will post a message to a predefined webhook when cypress is done

post_success() 
{
	runtime=$(tail -n 1 output.txt | xargs echo)
	
	msg="- [ [${environment}](${CYPRESS_HOST}) ] ${1} ${runtime} :1up:"

	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"${msg}\"}" $CYPRESS_WEB_HOOK
}

post_failure() 
{
	msg="- [ [${environment}](${CYPRESS_HOST}) ] ${1} Failed. :old-man-yells-at-cloud-simpsons:\n  - Check the logs\n    \`\`\`\n    kubectl logs \$(kubectl get pods -n monitoring --sort-by=.status.startTime | grep 'hmda-cypress-' | tail -n 1 | awk 'NR==1{print \$1}') -n monitoring\n    \`\`\`"

	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"${msg}\" }"  $CYPRESS_WEB_HOOK

	echo "\n\n--- ${1} output ---"
	cat output.txt
}

cleanup()
{
	rm output.txt
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
yarn cypress run --spec "cypress/integration/data-browser/**,cypress/integration/data-publication/**,cypress/integration/filing/**,cypress/integration/hmda-help/**,cypress/integration/tools/**"> output.txt
if  grep -q "All specs passed!" "output.txt" ; then
	post_success 'Integration testing :handshake:'
else
	post_failure 'Integration testing :handshake:'
fi
cleanup

# Load tests
# TODO: Host load test file on S3, download here
yarn cypress run --spec "cypress/integration/load/**" > output.txt
if  grep -q "All specs passed!" "output.txt" ; then
	post_success 'Load testing :tractor:'
else
	post_failure 'Load testing :tractor:'
fi
cleanup

# TODO: Generate and push MAX file to S3