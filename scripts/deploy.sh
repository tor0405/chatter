#!/usr/bin/env sh
set -x

ssh $REMOTE_USER@$REMOTE_HOST 'bash -s' < ./scripts/build-docker.sh
