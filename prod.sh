#!/bin/sh

# Client init
cd client && npm run build && cd ../

num_workers=$1

# Run server
echo "> running app ($num_workers workers)..."
hypercorn mgws:app -w $num_workers --bind 0.0.0.0:8000
