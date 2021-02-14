#!/usr/bin/env bash

set -ex

BASE_URL=${1:-http://www.normansicily.org/}

MAPBOX_ACCESS_TOKEN="${MAPBOX_APIKEY:-UNSET}"

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
git clone https://github.com/the-norman-sicily-project/data-dumps.git "$BUILDDIR/data-dumps"
git clone https://github.com/joephayes/sicilian-monastic-orders-choropleth-map.git "$BUILDDIR/sicilian-monastic-orders-choropleth-map"

echo $(cat $BUILDDIR/interactive-map/package.json | jq '.homepage='\"${BASE_URL}places/map/\") \
> $BUILDDIR/interactive-map/package.$$.json && \
cp $BUILDDIR/interactive-map/package.$$.json $BUILDDIR/interactive-map/package.json

echo build website
pushd site
hugo --cleanDestinationDir --baseUrl "$BASE_URL" -v
popd
cp -pr "$PROJECTDIR/site/public"/* "$DISTDIR"

echo build interactive map
cp -p "$BUILDDIR/interactive-map/src/apikeys.js.sample" "$BUILDDIR/interactive-map/src/apikeys.js"
sed -i -e "s/YOUR MAPBOX ACCESS TOKEN/${MAPBOX_ACCESS_TOKEN}/g" "$BUILDDIR/interactive-map/src/apikeys.js"
sed -i -e "s/map\/data/\/data/g" "$BUILDDIR/interactive-map/src/config.js"
pushd "$BUILDDIR/interactive-map"
yarn install
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

echo copy data files
cp -pr "$BUILDDIR/data-dumps/latest/." "$DISTDIR/data/."

echo copy Sicilian Monastic Orders Choropleth Map files
cp -p "$BUILDDIR/sicilian-monastic-orders-choropleth-map/config.js.sample" "$BUILDDIR/sicilian-monastic-orders-choropleth-map/config.js"
sed -i -e "s/YOUR MAPBOX ACCESS TOKEN/${MAPBOX_ACCESS_TOKEN}/g" "$BUILDDIR/sicilian-monastic-orders-choropleth-map/config.js"
mkdir "$DISTDIR/sicilian-monastic-orders-choropleth-map"
cp -p "$BUILDDIR/sicilian-monastic-orders-choropleth-map"/* "$DISTDIR/sicilian-monastic-orders-choropleth-map/."