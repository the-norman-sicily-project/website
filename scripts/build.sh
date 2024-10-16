#!/usr/bin/env bash

set -euxo pipefail

BASE_URL=${1:-https://www.normansicily.org/}

MAPBOX_ACCESS_TOKEN="${MAPBOX_APIKEY:-UNSET}"
REACT_APP_API_SERVER_HOST="${REACT_APP_API_SERVER_HOST:-localhost}"
REACT_APP_API_SERVER_PORT="${REACT_APP_API_SERVER_PORT:-4000}"

SCRIPTDIR=`dirname "$0"`
PROJECTDIR=`dirname "$SCRIPTDIR"`

BUILDDIR=$PROJECTDIR/build
DISTDIR=$PROJECTDIR/dist

echo checking for required programs
hash node 2>/dev/null || { echo >&2 "script requires node but it's not installed. Aborting."; exit 1; }
hash yarn 2>/dev/null || { echo >&2 "script requires yarn but it's not installed. Aborting."; exit 1; }
hash hugo 2>/dev/null || { echo >&2 "script requires hugo but it's not installed. Aborting."; exit 1; }
hash jq 2>/dev/null || { echo >&2 "script requires jq but it's not installed. Aborting."; exit 1; }

if [[ ! -d "./site/themes/hamburg" ]]; then
  echo hamburg theme directory does not exist - cloning it.
  git clone https://github.com/hauke96/hugo-theme-hamburg.git site/themes/hamburg
fi

if [ -d "$BUILDDIR" ]; then
  echo found existing build directory - removing it
  rm -rf "$BUILDDIR"
fi

if [ -d "$DISTDIR" ]; then
  echo found existing dist directory - removing it
  rm -rf "$DISTDIR"
fi

if [ -d "$PROJECTDIR/site/public" ]; then
  echo found existing hugo build directory - removing it
  rm -rf "$PROJECTDIR/site/public"
fi

echo creating build directory
mkdir -p "$BUILDDIR"

echo creating dist directory
mkdir -p "$DISTDIR"

echo cloning required repos
git clone https://github.com/the-norman-sicily-project/interactive-map.git "$BUILDDIR/interactive-map"
git clone https://github.com/the-norman-sicily-project/genealogical-trees.git -b "jph-nsp" "$BUILDDIR/genealogical-trees"

echo $(cat $BUILDDIR/interactive-map/package.json | jq '.homepage='\"${BASE_URL}places/map/\") \
> $BUILDDIR/interactive-map/package.$$.json && \
cp $BUILDDIR/interactive-map/package.$$.json $BUILDDIR/interactive-map/package.json

echo build website
pushd site
hugo --cleanDestinationDir --baseURL "$BASE_URL" --logLevel info
popd
cp -pr "$PROJECTDIR/site/public"/* "$DISTDIR"

echo build interactive map
pushd "$BUILDDIR/interactive-map"
yarn install
npx browserslist@latest --update-db
yarn build --production
popd

echo copy interactive mapping files
cp -pr "$BUILDDIR/interactive-map/build"/* "$DISTDIR/places/map/."

echo copy genealogical tree files
cp -p "$BUILDDIR/genealogical-trees/"*.js "$DISTDIR/people/family-tree/."
cp -p "$BUILDDIR/genealogical-trees/"*.json "$DISTDIR/people/family-tree/."
cp -p "$BUILDDIR/genealogical-trees/index.html" "$DISTDIR/people/family-tree/."
cp -p "$BUILDDIR/genealogical-trees/"*.css "$DISTDIR/people/family-tree/."
cp -p "$BUILDDIR/genealogical-trees/data/"*.png "$DISTDIR/data/."
cp -p "$BUILDDIR/genealogical-trees/data/"nsp.* "$DISTDIR/data/."
sed -i -e "s/data\//\/data\//g" "$DISTDIR/people/family-tree/index.js"