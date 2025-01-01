import Router from 'koa-router';

import { config } from '../config';

export function statusGET(): Router.IMiddleware<unknown, unknown> {
    return async (ctx, _next) => {
        try {
            const { branchName, gitSha } = config;
            ctx.body = { 'branch-name': branchName, 'git-sha': gitSha };
        } catch (exc) {
            console.error(exc instanceof Error ? exc.message : exc);

            ctx.status = 500;
            ctx.body = {
                text: `There is a problem with the server. Please try again later.`,
            };
        }
    };
}
