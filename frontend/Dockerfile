FROM node:10.10.0

RUN mkdir -p /src/app/frontend
WORKDIR /srv/app/frontend


COPY package.json /srv/app/frontend

RUN yarn

COPY . /srv/app/frontend

CMD [ "yarn", "start" ]
