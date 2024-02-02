#!/bin/bash

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
	rm output_docusaurus_e2e.txt
	rm output_e2e.txt
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
