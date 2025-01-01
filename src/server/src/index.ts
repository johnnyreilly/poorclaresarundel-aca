import Koa from 'koa';
import helmet from 'koa-helmet';
import send from 'koa-send';
import serve from 'koa-static';
import path from 'path';
import * as appInsights from 'applicationinsights';

import { config } from './config';
import { logger } from './logging';
import { routes } from './routes/index';

if (config.appInsightsConnectionString) {
    appInsights
        .setup(config.appInsightsConnectionString)
        .setAutoCollectConsole(true, true)
        .enableWebInstrumentation(true)
        .start();
}

const app = new Koa();

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'", 'storage.googleapis.com', 'www.google-analytics.com'],
            frameSrc: ['www.youtube.com', 'www.youtube-nocookie.com'],
        },
    })
);
app.use(logger);
app.use(routes);

const publicPath = path.join(__dirname, '..', 'client', 'dist');

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
