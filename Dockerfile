FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS prod

##
## IMAGE: build-client
##
FROM base AS build-client

WORKDIR /client

COPY src/client/package.json src/client/pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile	

COPY src/client ./
RUN pnpm run build

##
## IMAGE: build-server
##
FROM base AS build-server
WORKDIR /server

COPY src/server/package.json src/server/pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile	

COPY src/server ./
RUN pnpm run build

##
## IMAGE: runtime
##
FROM base AS runtime
ENV NODE_ENV production

WORKDIR /app
COPY --from=build-client client/dist ./client/dist
COPY --from=build-server server/dist ./dist
COPY --from=build-server server/package.json server/pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile --prod

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
