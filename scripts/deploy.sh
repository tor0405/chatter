#!/usr/bin/env sh
set -x

ssh deploy@192.241.129.61 'bash -s' < ./scripts/build-docker.sh
