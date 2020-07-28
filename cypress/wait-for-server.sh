# Wait for the Filing app to be reachable
while ! curl -s "0:0:0:0:0:0:0:0:8080" >/dev/null; do
    echo "Waiting for localhost:8080..."
    sleep 10s
done