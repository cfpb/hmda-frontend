#!/bin/bash
# Script that will post a message to a predefined webhook when cypress is done

post_success() 
{
	project="[${environment}][$1]"
	runtime=$(tail -n 1 output.txt | xargs echo)
	msg="${project} :1up: ${runtime}"
	echo $msg
	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"${msg}\"}" $CYPRESS_WEB_HOOK
}

post_failure() 
{
	project="[${environment}][$1]"
	msg="${project} :old-man-yells-at-cloud-simpsons: Testing failed!"
	echo $msg
	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \" ${msg}\nrun \`kubectl logs \$(kubectl get pods -n monitoring --sort-by=.status.startTime | grep 'hmda-cypress-${CYPRESS_ENV}' | tail -n 1 | awk 'NR==1{print \$1}') -n monitoring\` to see the logs for the last run\" }"  $CYPRESS_WEB_HOOK
}

cleanup()
{
	rm output.txt
}

if [[ "$CYPRESS_HOST" == *"ffiec"* ]]; then
  environment="PROD"
elif [[ "$CYPRESS_HOST" == *"beta"* ]]; then
  environment="BETA"
fi

# Integration tests
yarn cypress run --spec "cypress/integration/**"> output.txt
if  grep -q "All specs passed!" "output.txt" ; then
	post_success 'Integration Testing'
else
	post_failure 'Integration Testing'
fi
cleanup

# Load tests
yarn cypress run --spec "cypress/load-tests/**" > output.txt
if  grep -q "All specs passed!" "output.txt" ; then
	post_success 'Load Testing'
else
	post_failure 'Load Testing'
fi
cleanup
