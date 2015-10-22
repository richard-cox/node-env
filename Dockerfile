FROM hwestphal/nodebox

COPY ./ /src
WORKDIR /src

ENV BUILD_HTTP_PROXY ''
ENV BUILD_HTTPS_PROXY ''

ENV HTTP_PROXY = ${BUILD_HTTP_PROXY}
RUN env

RUN npm install

EXPOSE  8080
CMD ["node", "server.js"]

