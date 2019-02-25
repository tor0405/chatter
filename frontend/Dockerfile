FROM node:10.10.0 as build

RUN mkdir -p /src/app/frontend
WORKDIR /srv/app/frontend


COPY package.json yarn.lock /srv/app/frontend/

RUN yarn
COPY . /srv/app/frontend
RUN yarn build
COPY build /srv/app/frontend/build



#################
FROM nginx:stable

COPY ./build /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
