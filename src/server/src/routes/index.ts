import { FastifyInstance } from 'fastify';
import { prayerRequestPOST } from './prayerRequestPOST.js';
import { statusGET } from './statusGET.js';

export function routes(fastify: FastifyInstance) {
    statusGET(fastify);
    prayerRequestPOST(fastify);
}
