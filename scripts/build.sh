#!/usr/bin/env bash

# import .env variables into bash environment
export $(cat .env | xargs)

case $NODE_ENV in
  "development"|"test")
    npm-run-all build:server build:client
    ;;
  "production")
    npm-run-all build:server build:client
    npm run db:migrate
    ;;
  "staging")
    npm-run-all build:server build:client
    npm run db:setup
    ;;
esac
