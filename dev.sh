#!/bin/sh

# Client init
cd client && npm run build && cd ../

# Run server
echo "> running app (1 worker) with reload..."
hypercorn mgws:app --debug --reload -w 1
