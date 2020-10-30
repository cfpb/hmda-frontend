API=$1
MAX=90
i=0

if [[ $API = 'help' ]]
then
    echo ""
    echo "Wait for Server"
    echo ""
    echo "  Polling script to pause while waiting for a development server to become available"
    echo ""
    echo "  Usage:"
    echo "   $> ./wait-for-server.sh <platform | institutions | frontend>"
    echo ""
elif [[ $API = 'institutions' ]]
then
    # Wait for the Institution API to be reachable
    while ! curl -s "localhost:3010" >/dev/null; do
        ((i = i + 1))
        if [[ "$i" -gt "$MAX" ]]
        then
            echo "Error: Timed out waiting for the HMDA Institutions API to load! "
            exit 1
        fi
        echo "Waiting for the HMDA Institutions API to load on localhost:3010..."
        sleep 10s
    done
    exit 0
elif [[ $API = 'platform' ]]
then
    # Wait for the Filing app to be reachable
    while ! curl -s "localhost:8080" >/dev/null; do
        ((i = i + 1))
        if [[ "$i" -gt "$MAX" ]]
        then
            echo "Error: Timed out waiting for the HMDA Platform to load! "
            exit 1
        fi
        echo "Waiting for the HMDA Platform to load on localhost:8080..."
        sleep 10s
    done
    exit 0
elif [[ $API = 'frontend' ]]
then
    # Wait for the Frontend app to be reachable
    while ! curl -s "localhost:3000" >/dev/null; do
        ((i = i + 1))
        if [[ "$i" -gt "$MAX" ]]
        then
            echo "Error: Timed out waiting for the HMDA Frontend to load! "
            exit 1
        fi
        echo "Waiting for the HMDA Frontend to load on localhost:3000..."
        sleep 10s
    done
    exit 0
fi
