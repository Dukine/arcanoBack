FROM node:18.12.1

WORKDIR /user/src/api

COPY . .

RUN yarn install

EXPOSE 3001

RUN yarn build

CMD ["yarn","start"]