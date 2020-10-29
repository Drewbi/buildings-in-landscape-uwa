FROM node:14.4.0-alpine

ADD . /var/app

WORKDIR /var/app

ENV PATH="/var/app/node_modules/.bin/:${PATH}"

RUN npm install

RUN npm run build

RUN npm start

EXPOSE 3000
