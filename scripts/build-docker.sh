#!/usr/bin/env sh
set -x

cd ~/chatter/
git pull
touch .t
sudo docker-compose down
sudo docker-compose up --build
