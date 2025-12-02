#!/bin/sh
# Development script that runs tsc --watch and node --watch in parallel

# Start TypeScript compiler in watch mode in background
tsc --watch --preserveWatchOutput &
TSC_PID=$!

# Wait a moment for initial compilation
sleep 3

# Start node with watch mode
node --watch --import reflect-metadata dist/index.js &
NODE_PID=$!

# Function to cleanup on exit
cleanup() {
  kill $TSC_PID $NODE_PID 2>/dev/null
  exit
}

# Trap signals to cleanup
trap cleanup INT TERM

# Wait for processes
wait

