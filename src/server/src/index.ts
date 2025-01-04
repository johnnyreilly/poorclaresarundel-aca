import Koa from 'koa';
import helmet from 'koa-helmet';
// import koaLogger from 'koa-logger';
import send from 'koa-send';
import serve from 'koa-static';
import * as path from 'path';
import * as appInsights from 'applicationinsights';

import { config } from './config.js';
import { logger } from './logging.js';
import { routes } from './routes/index.js';

// const stripAnsi = await import('strip-ansi');

if (config.appInsightsConnectionString) {
    appInsights
        .setup(config.appInsightsConnectionString)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true)
        .setAutoCollectRequests(true)
        // .enableWebInstrumentation(true) // not being used on the client yet
        .start();
}

const app = new Koa();

// app.use(koaLogger((text) => stripAnsi(text)));
app.use(
    helmet.default.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'", 'storage.googleapis.com', 'www.google-analytics.com'],
            frameSrc: ['www.youtube.com', 'www.youtube-nocookie.com'],
        },
    })
);
app.use(logger);
app.use(routes);

const publicPath = path.join(path.dirname(import.meta.url), '..', 'client', 'dist');

app.use(serve(publicPath));
app.use(async (ctx) => {
    await send(ctx, 'index.html', { root: publicPath });
});

app.listen(config.port);

console.log(
    `
################
# App started! #
################

- server running at: http://localhost:${config.port}
- static files served from: ${publicPath}
`
);
