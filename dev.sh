#!/bin/sh

# Client init
cd client && npm run build && cd ../


# Choosing num of workers
if [ -z "$1" ]; then
    echo "> running app (1 worker) with reload..."
    hypercorn mgws:app --debug --reload -w 1
else
    num_workers=$1
    echo "> running app ($num_workers workers)..."
    hypercorn mgws:app --debug -w $num_workers
fi
