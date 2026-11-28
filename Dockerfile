FROM node:26-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install --global pnpm@11

##
## IMAGE: build-base
## python3, make and g++ let node-gyp compile native modules that have no
## prebuilt binary for this Node version (applicationinsights-native-metrics)
##
FROM base AS build-base
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

##
## IMAGE: build-client
##
FROM base AS build-client

ARG VITE_BRANCH_NAME="UNKNOWN"
ARG VITE_GIT_SHA="UNKNOWN"
ARG VITE_BUILT_AT="UNKNOWN"

WORKDIR /client

COPY src/client/package.json src/client/pnpm-lock.yaml src/client/pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile	

COPY src/client ./
RUN VITE_BRANCH_NAME=${VITE_BRANCH_NAME} VITE_GIT_SHA=${VITE_GIT_SHA} VITE_BUILT_AT=${VITE_BUILT_AT} pnpm run build

##
## IMAGE: build-server
##
FROM build-base AS build-server
WORKDIR /server

COPY src/server/package.json src/server/pnpm-lock.yaml src/server/pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile	

COPY src/server ./
RUN pnpm run build

##
## IMAGE: prod-deps
## production node_modules, built where the compiler toolchain is available
##
FROM build-base AS prod-deps
WORKDIR /app

COPY src/server/package.json src/server/pnpm-lock.yaml src/server/pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile --prod

##
## IMAGE: runtime
##
FROM base AS runtime
ENV NODE_ENV production

WORKDIR /app
COPY --from=build-client client/dist ./client/dist
COPY --from=build-server server/dist ./dist
COPY --from=build-server server/package.json server/pnpm-lock.yaml server/pnpm-workspace.yaml ./
COPY --from=prod-deps app/node_modules ./node_modules

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
