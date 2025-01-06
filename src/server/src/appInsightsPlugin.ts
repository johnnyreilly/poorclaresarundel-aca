import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import appInsights from 'applicationinsights';

declare module 'fastify' {
    export interface FastifyRequest {
        // here we augment FastifyRequest interface as advised here: https://fastify.dev/docs/latest/Reference/Hooks/#using-hooks-to-inject-custom-properties
        app: { start: number };
    }
}

// based on https://github.com/microsoft/ApplicationInsights-node.js/issues/627#issuecomment-2194527018
export const appInsightsPlugin = fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    if (!options.client) {
        console.log('App Insights not configured');
        return;
    }

    const client: appInsights.TelemetryClient = options.client;
    const urlsToIgnore = options.urlsToIgnore || [];

    fastify.addHook('onRequest', async function (this: FastifyInstance, request, _reply) {
        // const same = fastify === this;

        // store the start time of the request
        const start = Date.now();
        request.app = { start };
    });

    fastify.addHook('onResponse', async function (this: FastifyInstance, request, reply) {
        if (urlsToIgnore.includes(request.raw.url)) return;

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
