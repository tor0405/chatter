FROM node:10.10.0

RUN mkdir -p /src/app/backend
WORKDIR /srv/app/backend


COPY package.json /srv/app/backend

RUN npm install

COPY . /srv/app/backend

CMD [ "npm", "run", "dev" ]
