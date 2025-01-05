import Fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import helmet from '@fastify/helmet';

import path from 'path';
import appInsights from 'applicationinsights';
import { fileURLToPath } from 'url';

import { config } from './config.js';
import { routes } from './routes/index.js';
import { appInsightsPlugin } from './appInsightsPlugin.js';

let client: appInsights.TelemetryClient | undefined;

if (config.appInsightsConnectionString) {
    appInsights
        .setup(config.appInsightsConnectionString)
        .setAutoCollectConsole(true, true)
        .setAutoCollectExceptions(true)
        .setAutoCollectRequests(true)
        // .enableWebInstrumentation(true) // not being used on the client yet
        .start();

    client = appInsights.defaultClient;
}

export const fastify: FastifyInstance = Fastify({
    logger: true,
});

fastify.register(appInsightsPlugin, { client, urlsToIgnore: ['/'] });

fastify.register(helmet, {
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'", 'storage.googleapis.com', 'www.google-analytics.com'],
            frameSrc: ['www.youtube.com', 'www.youtube-nocookie.com'],
        },
    },
});

fastify.addHook('onRequest', async (request, reply) => {
    if (request.url.includes('wp-includes') || request.url.includes('wp-admin')) {
        reply.code(404).send('Not Found');
    }
});

routes(fastify);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, '..', 'client', 'dist');

fastify.register(fastifyStatic, {
    root: publicPath,
    // prefix: '/public/',
});

fastify.setNotFoundHandler((_req, res) => {
    res.sendFile('index.html');
});

async function start() {
    try {
        await fastify.listen({
            port: config.port,
            host: '0.0.0.0', // necessary to run in Docker https://fastify.dev/docs/latest/Guides/Getting-Started/#note
        });

        const address = fastify.server.address();
        const port = typeof address === 'string' ? address : address?.port;

        console.log(
            `# App started! #
- server running at: http://localhost:${port}
- static files served from: ${publicPath}
`
        );
    } catch (err) {
        console.error(err);
        fastify.log.error(err);
        process.exit(1);
    }
}

start();
