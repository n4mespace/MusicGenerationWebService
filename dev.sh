#!/bin/sh

# Choosing num of workers
if [ -z "$1" ]; then
    echo "Running app with 1 worker with reload..."
    hypercorn mgws:app --debug --reload -w 1
else
    num_workers=$1
    echo "Running app with $num_workers workers..."
    hypercorn mgws:app --debug -w $num_workers
fi
