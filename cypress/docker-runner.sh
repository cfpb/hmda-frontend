#!/bin/bash
# Script that will post a message to a predefined webhook when cypress is done

post_success() 
{
	project="[$1]"
	runtime=$(tail -n 1 output.txt | xargs echo)
	msg="${project} ${runtime}"
	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"CYPRESS_HOST: ${CYPRESS_HOST} Complete. :1up: ${msg}\"}" $CYPRESS_WEB_HOOK
}

post_failure() 
{
	project="[$1]"
	msg="${project} Testing failed!"
	echo $msg
	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"CYPRESS_HOST: ${CYPRESS_HOST} Complete.\n:old-man-yells-at-cloud-simpsons: ${msg}\nrun \`kubectl logs \$(kubectl get pods -n monitoring --sort-by=.status.startTime | grep 'hmda-cypress-${CYPRESS_ENV}' | tail -n 1 | awk 'NR==1{print \$1}') -n monitoring\` to see the logs for the last run\" }"  $CYPRESS_WEB_HOOK
}

cleanup()
{
	rm output.txt
}


# Integration tests
yarn cypress run --spec "cypress/integration/**"> output.txt
if  grep -q "All specs passed!" "output.txt" ; then
	post_success 'Integration Testing'
else
	post_failure'Integration Testing'
fi
cleanup

# Load tests
yarn cypress run --spec "cypress/load-test/**" > output.txt
if  grep -q "All specs passed!" "output.txt" ; then
	post_success 'Load Testing'
else
	post_failure'Load Testing'
fi
cleanup
