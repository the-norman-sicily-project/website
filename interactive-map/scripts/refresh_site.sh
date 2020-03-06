#! /bin/bash

set -ex

SCRIPT_DIR=$(dirname $0) #get the location of 'this' script
PROJECT_ROOT="$SCRIPT_DIR/.."

rm -rf "$PROJECT_ROOT/build"
rm -rf "$PROJECT_ROOT/../static-site/resources/public/places/map"
yarn build
mkdir -p "$PROJECT_ROOT/../static-site/resources/public/places/map"
cp -pr "$PROJECT_ROOT/build/." "$PROJECT_ROOT/../static-site/resources/public/places/map/."
