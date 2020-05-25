#!/usr/bin/env bash

# import .env variables into bash environment
export $(cat .env | xargs)

rm -rf ./client/dist
mkdir ./client/dist

case $NODE_ENV in
  "development"|"test")
    ./node_modules/.bin/webpack --config ./webpack.dev.babel.js
    ;;
  "production"|"staging")
    ./node_modules/.bin/webpack --config ./webpack.prod.babel.js
    ;;
esac
