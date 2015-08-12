FROM node:slim

COPY ./src /src
WORKDIR /src

EXPOSE  8080
CMD ["node", "server.js"]



