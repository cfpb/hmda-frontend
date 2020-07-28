while ! curl -s "0:0:0:0:0:0:0:0:$APP_PORT" >/dev/null; do
    echo "Waiting for localhost:$APP_PORT..."
    sleep 10s
done