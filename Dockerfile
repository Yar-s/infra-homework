FROM node:22-alpine
ENV USERNAME=""

RUN mkdir /var/static

COPY package.json .
COPY server.js .
RUN npm i

EXPOSE 8080

CMD ["node", "server.js"]

# docker build -t server .
# docker run --mount type=bind,source=./volume,destination=/var/static --env USERNAME=kholstinevich -p 3000:8080 server