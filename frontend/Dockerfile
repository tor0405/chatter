FROM node:10.10.0 as build

RUN mkdir -p /src/app/frontend
WORKDIR /srv/app/frontend


COPY package.json /srv/app/frontend/

RUN yarn --network-timeout 100000
COPY . /srv/app/frontend
RUN yarn build


#################
FROM nginx:stable

COPY --from=build /srv/app/frontend/build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
