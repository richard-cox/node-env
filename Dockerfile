FROM hwestphal/nodebox

COPY ./ /src
WORKDIR /src

ENV HTTP_PROXY %http_proxy%
ENV HTTPS_PROXY %https_proxy%

RUN env

RUN npm install

EXPOSE  8080
CMD ["node", "server.js"]



