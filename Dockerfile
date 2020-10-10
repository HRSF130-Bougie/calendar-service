FROM node:12.19.0-slim

RUN mkdir -p /app

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn install --network-timeout 1000000

COPY . /app

RUN bash -c 'yarn run build'

EXPOSE 3002

CMD ["yarn", "start"]
