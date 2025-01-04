import { FastifyInstance } from 'fastify';

import { config } from '../config.js';

export function statusGET(fastify: FastifyInstance) {
    fastify.get('/api/status', async (_request, reply) => {
        try {
            console.log('statusGET');
            const { branchName, gitSha, builtAt } = config;
            return { 'branch-name': branchName, 'git-sha': gitSha, 'built-at': builtAt };
        } catch (exc) {
            console.error(exc instanceof Error ? exc.message : exc);

            reply.status(500);
            return {
                text: `There is a problem with the server. Please try again later.`,
            };
        }
    });
}
