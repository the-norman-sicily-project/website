#!/usr/bin/env bash

set -ex

MAPBOX_ACCESS_TOKEN="${MAPBOX_APIKEY:-UNSET}"

SCRIPTDIR=`dirname "$0"`
PROJECTDIR=`dirname "$SCRIPTDIR"`

BUILDDIR=$PROJECTDIR/build
DISTDIR=$PROJECTDIR/dist

echo checking for required programs
hash node 2>/dev/null || { echo >&2 "script requires node but it's not installed. Aborting."; exit 1; }
hash yarn 2>/dev/null || { echo >&2 "script requires yarn but it's not installed. Aborting."; exit 1; }
hash hugo 2>/dev/null || { echo >&2 "script requires hugo but it's not installed. Aborting."; exit 1; }

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
git clone https://github.com/the-norman-sicily-project/genealogical-trees.git "$BUILDDIR/genealogical-trees"

echo build website
pushd site
hugo --cleanDestinationDir --baseUrl "http://localhost:8080/"
popd
cp -pr "$PROJECTDIR/site/public"/* "$DISTDIR"

echo build interactive map
cp -p "$BUILDDIR/interactive-map/src/apikeys.js.sample" "$BUILDDIR/interactive-map/src/apikeys.js"
sed -i -e "s/YOUR MAPBOX ACCESS TOKEN/${MAPBOX_ACCESS_TOKEN}/g" "$BUILDDIR/interactive-map/src/apikeys.js"
pushd "$BUILDDIR/interactive-map"
yarn install
yarn build --production
popd

echo copy interactive mapping files
cp -pr "$BUILDDIR/interactive-map/build"/* "$DISTDIR/places/map/."

echo copy genealogical tree files
cp -p "$BUILDDIR/genealogical-trees/d3.v3.5.17.min.js" "$DISTDIR/people/family-tree/."
cp -p "$BUILDDIR/genealogical-trees/nsp.html" "$DISTDIR/people/family-tree/."
cp -p "$BUILDDIR/genealogical-trees/data/nsp.json" "$DISTDIR/people/family-tree/data/."