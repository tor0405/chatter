FROM node:10.10.0

RUN mkdir -p /src/app/frontend
WORKDIR /srv/app/frontend


COPY package.json /srv/app/frontend
COPY package-lock.json /srv/app/frontend

RUN npm install

COPY . /srv/app/frontend

CMD [ "npm", "start" ]
