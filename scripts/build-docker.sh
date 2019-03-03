#!/usr/bin/env sh
set -x

cd ~/chatter/
git pull

docker-compose down
docker-compose up --build
