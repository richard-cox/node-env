FROM node
COPY ./src /src
WORKDIR /src
RUN npm install
#EXPOSE  8888
CMD ["node", "server.js"]
