FROM node:14

RUN mkdir /app
WORKDIR /app

COPY ./app .

RUN yarn install

EXPOSE $PORT
EXPOSE 8080

CMD ["yarn","start"]
