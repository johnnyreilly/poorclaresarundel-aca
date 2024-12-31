import { koaBody } from 'koa-body';
import Router from 'koa-router';
// import * as Mailgun from 'mailgun-js';

import { prayerRequestPOST } from './prayerRequestPOST';
import { statusGET } from './statusGET';

const router = new Router();

router.get('/api/Status', statusGET());
router.post('/api/PrayerRequest', koaBody(), prayerRequestPOST());

export const routes = router.routes();
