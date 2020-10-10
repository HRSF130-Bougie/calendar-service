FROM node:12.19.0-slim

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .

RUN yarn install --network-timeout 1000000

COPY . .

EXPOSE 3002

CMD ["yarn", "start"]