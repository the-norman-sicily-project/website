#!/usr/bin/env bash

set -euxo pipefail

AWS_PROFILE=${1:-nsp}

SCRIPTDIR=`dirname "$0"`
PROJECTDIR=`dirname "$SCRIPTDIR"`

DISTDIR=$PROJECTDIR/dist/

BUCKET_NAME=normansicily.org

echo checking for required programs
hash s5cmd 2>/dev/null || { echo >&2 "script requires s5cmd but it's not installed. Aborting."; exit 1; }

if [[ ! -d "$DISTDIR" ]]; then
  echo dist directory does not exist - please run build script first!
  exit 1
fi

s5cmd --profile $AWS_PROFILE sync --delete "$DISTDIR" s3://$BUCKET_NAME
