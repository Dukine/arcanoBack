FROM node:latest

WORKDIR /user/src/api

COPY . .

RUN yarn install

EXPOSE 3001

RUN yarn build

CMD ["yarn","start"]