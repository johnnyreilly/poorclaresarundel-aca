import Koa from 'koa';
import helmet from 'koa-helmet';
import send from 'koa-send';
import serve from 'koa-static';
import path from 'path';

import { config } from './config';
import { logger } from './logging';
import { routes } from './routes';

const isDevelopment = process.env.NODE_ENV === 'development';

const app = new Koa();

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'", 'storage.googleapis.com', 'www.google-analytics.com'],
            frameSrc: ['www.youtube.com', 'www.youtube-nocookie.com'],
        },
    }),
);
app.use(logger);
app.use(routes);

const publicPath = isDevelopment
    ? path.join(__dirname, '..', '..', 'client', 'dist')
    : path.join(__dirname, '..', 'client', 'dist');

const indexHtmlPath = path.join(publicPath, 'index.html');
app.use(serve(publicPath));
app.use(async (ctx) => {
    await send(ctx, 'index.html', { root: publicPath });
});

app.listen(config.port);

console.log(
    `Server running on port ${config.port}; static files served from ${publicPath}, SPA template from ${indexHtmlPath}`,
);
