MAX_ITERATIONS=60
WAIT_TIME=10s
i=0

# Wait for the Filing app to be reachable
while ! curl -s "localhost:8080" >/dev/null; do
    ((i = i + 1))
    if [[ "$i" -gt $MAX_ITERATIONS ]]; then
        echo "Error: Timed out waiting for the HMDA Platform to load! "
        exit 1
    fi
    echo "Waiting for the HMDA Platform to load on localhost:8080..."
    sleep $WAIT_TIME
done

i=0

# Wait for the Frontend app to be reachable
while ! curl -s "localhost:3000" >/dev/null; do
    ((i = i + 1))
    if [[ "$i" -gt $MAX_ITERATIONS ]]; then
        echo "Error: Timed out waiting for the HMDA Frontend to load! "
        exit 1
    fi
    echo "Waiting for the HMDA Frontend to load on localhost:3000..."
    sleep $WAIT_TIME
done

i=0

# Wait for the Institution API to be reachable
while ! curl -s "localhost:9092" >/dev/null; do
    ((i = i + 1))
    if [[ "$i" -gt 30 ]]; then
        echo "Error: Timed out waiting for the HMDA Institutions API to load! "
        exit 1
    fi
    echo "Waiting for the HMDA Institutions API to load on localhost:9092..."
    sleep 10s
done
