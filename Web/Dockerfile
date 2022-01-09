##
## IMAGE: build-client
##
FROM node:16 AS build-client
WORKDIR /client

COPY client/package.json client/yarn.lock ./
RUN yarn --network-timeout 100000

COPY client ./
RUN yarn build

##
## IMAGE: build-server
##
FROM node:16 AS build-server
WORKDIR /server

COPY server/package.json server/yarn.lock ./
RUN yarn --network-timeout 100000

COPY server ./
RUN yarn build

##
## IMAGE: runtime
##
FROM node:16 AS runtime
ENV NODE_ENV production

WORKDIR /app
COPY --from=build-client client/build ./client/build
COPY --from=build-server server/dist ./dist
COPY --from=build-server server/package.json server/yarn.lock ./
RUN yarn --network-timeout 100000

EXPOSE 3000
CMD [ "node", "dist/index.js" ]

# then to build
# docker build --tag poorclaresarundel .

# then to run
# docker run -p 3000:3000 poorclaresarundel

# docker stop poorclaresarundel
# docker rm poorclaresarundel

# debug failing build
# docker run -it 5b272099a bash -il

# to run terminal inside container
# docker exec -it 191e bash 