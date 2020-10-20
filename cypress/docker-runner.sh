#!/bin/bash

# Script that will post a message to a predefined webhook when cypress is done

FAILED=$(yarn cypress run > output.txt)
if [ $FAILED = 0 ]; then
	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"CYPRESS_HOST: ${CYPRESS_HOST} Complete. :thumbs-up-bb8: No Failing specs.\"}" $CYPRESS_WEB_HOOK
else
	curl -i -X POST -H 'Content-Type: application/json' -d "{\"text\": \"CYPRESS_HOST: ${CYPRESS_HOST} Complete.\n:starwars-darth: Cypress Has Failed!\nrun \`kubectl logs \$(kubectl get pods -n monitoring --sort-by=.status.startTime | grep 'hmda-cypress-${CYPRESS_ENV}' | tail -n 1 | awk 'NR==1{print \$1}') -n monitoring\` to see the logs for the last run\" }"  $CYPRESS_WEB_HOOK
	cat output.txt
fi
rm output.txt
