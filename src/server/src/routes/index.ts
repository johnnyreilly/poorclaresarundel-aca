import { koaBody } from 'koa-body';
import Router from 'koa-router';

import { prayerRequestPOST } from './prayerRequestPOST';
import { statusGET } from './statusGET';

const router = new Router();

router.get('/api/status', statusGET());
router.post('/api/prayer-request', koaBody(), prayerRequestPOST());

export const routes = router.routes();
