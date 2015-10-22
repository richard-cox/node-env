FROM hwestphal/nodebox

COPY ./ /src
WORKDIR /src

ENV HTTP_PROXY %HTTP_PROXY%
ENV HTTPS_PROXY %HTTPS_PROXY%

RUN env

RUN npm install

EXPOSE  8080
CMD ["node", "server.js"]



