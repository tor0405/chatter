#!/usr/bin/env sh
set -x

touch test
cd ~/chatter/
git pull
touch test2
sudo docker-compose down
sudo docker-compose up --build
