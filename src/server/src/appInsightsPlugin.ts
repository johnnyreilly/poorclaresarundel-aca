import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import appInsights from 'applicationinsights';

// based on https://github.com/microsoft/ApplicationInsights-node.js/issues/627#issuecomment-2194527018
declare module 'fastify' {
    export interface FastifyRequest {
        app: { start: number };
    }
}

export const appInsightsPlugin = fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    if (!options.client) {
        console.log('App Insights not configured');
        return;
    }

    const client: appInsights.TelemetryClient = options.client;

    fastify.addHook('onRequest', async (request, _reply) => {
        const start = Date.now();
        request.app = { start };
    });

    fastify.addHook('onResponse', async (request, reply) => {
        if (request.raw.url === '/') return; // Ignore health check

        const duration = Date.now() - request.app.start;
        client.trackRequest({
            name: request.raw.method + ' ' + request.raw.url,
            url: request.raw.url,
            duration: duration,
            resultCode: reply.statusCode.toString(),
            success: reply.statusCode < 400,
            properties: {
                method: request.raw.method,
                url: request.raw.url,
            },
            measurements: {
                duration: duration,
            },
        });
    });
});
