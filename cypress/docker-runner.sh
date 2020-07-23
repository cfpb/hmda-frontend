#!/bin/bash

# Script that will post a message to a predefined webhook when cypress is done

RESULTS=":starwars-darth: Cypres Has Failed!"
$(yarn cypress run > output.txt) && RESULTS=":thumbs-up-bb8: No Failing specs."
RES=$(awk '/Run Finished/ {p=1}; p==1 {print}' output.txt)
curl -i -X POST -H 'Content-Type: application/json' \
	 -d "{\"text\": \"CYPRESS_HOST: ${CYPRESS_HOST} Complete.\n${RESULTS} See results below:\n\`\`\`\n${RES}\n\`\`\`\"}" \
	 $CYPRESS_WEB_HOOK
rm output.txt