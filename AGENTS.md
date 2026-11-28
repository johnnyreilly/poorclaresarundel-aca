# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

The website of the Poor Clares of Arundel (https://www.poorclaresarundel.org): a React single-page app served by a small Fastify server, packaged as one Docker image and deployed to Azure Container Apps.

Most changes are content edits to the client (text, images, new pages). The server rarely changes.

## Layout

| Path                 | What lives there                                                                   |
| -------------------- | ---------------------------------------------------------------------------------- |
| `src/client/`        | React 18 + TypeScript + Vite SPA, styled with Bootstrap 5 / reactstrap             |
| `src/server/`        | Fastify 5 + TypeScript (ESM) server: serves the built client and the `/api` routes |
| `infra/main.bicep`   | Azure infrastructure (Container Apps)                                              |
| `.github/workflows/` | CI (build + lint for client and server), container build, deploy                   |
| `Dockerfile`         | Multi-stage build: client, server, then a runtime image                            |

The root, `src/client` and `src/server` are three separate pnpm projects, each with its own `package.json` and `pnpm-lock.yaml`. It is not a pnpm workspace: add a dependency by running `pnpm add` inside the project that needs it, and commit that project's lockfile.

## Commands

Use pnpm (Node 26). The pnpm version is pinned by `packageManager` in the root `package.json` and the Node version by `.nvmrc`; CI reads both, and the `Dockerfile` reads the pnpm version. A root `pnpm install` also installs the client and server.

```shell
pnpm install          # root, then client and server via postinstall
pnpm start            # Vite dev server for the client only (no /api)
pnpm run preview      # build client + server, then run the server on http://localhost:3000
pnpm run build        # clean, install, build client and server
```

Per project, from `src/client` or `src/server`:

```shell
pnpm run build        # client: tsc -b && vite build; server: tsc
pnpm run lint         # eslint
```

There are no automated tests. Before finishing a change, run `pnpm run build` and `pnpm run lint` in each project you touched; that is exactly what CI checks.

## Client

- Entry point: `src/client/src/index.tsx`. It defines three top-level routes: `/` (`Home.tsx`), `/the-convent` (`the-convent/`) and everything else (`main/`, lazily loaded).
- Each page is one file exporting a path constant and a component, for example `kenyaPath` and `Kenya` in `src/client/src/main/community/Kenya.tsx`.
- To add a page under `main/`:
  1. Create the component file, exporting `somethingPath` and `Something`.
  2. Add a `<Route>` in `src/client/src/main/index.tsx`.
  3. Add a link in `src/client/src/main/Menu.tsx` if it should appear in the navigation.
- Page content is written directly in JSX; there is no CMS or markdown layer.
- Images sit in an `images/` folder beside the pages that use them and are imported as modules.
- The dev server (`pnpm start`) does not proxy `/api`, so the prayer request form only works under `pnpm run preview` or Docker.

## Server

- Entry point: `src/server/src/index.ts`. Routes are registered in `src/server/src/routes/index.ts`:
  - `GET /api/status`
  - `POST /api/prayer-request`, which sends email through Mailgun
- Any unmatched path returns the client's `index.html`, so client-side routes work on refresh.
- Configuration comes from environment variables read in `src/server/src/config.ts` (`APPSETTINGS_*`, `APPLICATIONINSIGHTS_CONNECTION_STRING`). Never commit real values.
- The server is ESM: relative imports need the `.js` extension (`./config.js`).
- Helmet sets a Content Security Policy in `index.ts`. Embedding content from a new third-party origin (scripts, iframes such as a video host other than YouTube) needs that origin added to the CSP directives, otherwise it works in `pnpm start` and is blocked in production.

## Code style

- Prettier settings are in `src/.prettierrc.js`: 4-space indent, single quotes, 120 character line width.
- TypeScript throughout; keep both projects free of ESLint errors.
- Follow the patterns of neighbouring files rather than introducing new libraries or abstractions.

## CI and deployment

- Pull requests to `main` run build + lint for the client and the server.
- Pushing to `main` builds the container and deploys to production. Treat a merge to `main` as a release.
- Commenting `/deploy` on a pull request deploys it to a preview environment.
- Dependency updates are handled by Renovate (`renovate.json`); avoid unrelated version bumps in feature changes.
