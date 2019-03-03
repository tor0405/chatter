#!/usr/bin/env sh
set -x

cd ~/chatter/

git pull

sudo docker-compose down
sudo docker-compose up -d
