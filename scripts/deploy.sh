#!/usr/bin/env bash

set -ex

AWS_PROFILE=${1:-nsp}

SCRIPTDIR=`dirname "$0"`
PROJECTDIR=`dirname "$SCRIPTDIR"`

DISTDIR=$PROJECTDIR/dist

BUCKET_NAME=normansicily.org

echo checking for required programs
hash aws 2>/dev/null || { echo >&2 "script requires AWS CLI but it's not installed. Aborting."; exit 1; }

if [[ ! -d "$DISTDIR" ]]; then
  echo dist directory does not exist - please run build script first!
  exit 1
fi

aws s3 sync "$DISTDIR" s3://$BUCKET_NAME --profile $AWS_PROFILE
