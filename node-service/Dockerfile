##
## IMAGE: build-client
##
FROM node:20 AS build-client

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /client

COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm fetch --prod

COPY client ./
RUN pnpm run build

##
## IMAGE: build-server
##
FROM node:20 AS build-server
WORKDIR /server

COPY server/package.json server/yarn.lock ./
RUN yarn --network-timeout 100000

COPY server ./
RUN yarn build

##
## IMAGE: runtime
##
FROM node:20 AS runtime
ENV NODE_ENV production

WORKDIR /app
COPY --from=build-client client/dist ./client/dist
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