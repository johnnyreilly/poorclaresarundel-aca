import * as fs from 'fs';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import * as Mailgun from 'mailgun-js';
import * as path from 'path';
import axios from 'axios';

const router = new Router();

const apiKey = process.env.APPSETTINGS_API_KEY; // long guid from mailgun
const domain = process.env.APPSETTINGS_DOMAIN; // eg 'mg.priou.co.uk';
const prayerRequestFromEmail = process.env.APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL;
const prayerRequestRecipientEmail = process.env.APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL;

const mailerService = process.env.MAILER_SERVICE_NAME || 'dotnet-app';

//use dapr http proxy (header) to call inventory service with normal /inventory route URL in axios.get call
const daprPort = process.env.DAPR_HTTP_PORT || 3501;
const daprSidecar = `http://localhost:${daprPort}`

function readFileAsPromise(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) { reject(err); }
            else {
                resolve(data.toString());
            }
        });
    });
}

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
router.post('/api/PrayerRequest', koaBody(), async (ctx, next) => {
    // Invokes the method to send emails given the above data with the helper library
    try {
        const { email, prayFor } = ctx.request.body;

        const data = await axios.get(`${daprSidecar}/weatherForecast`, {
            headers: {'dapr-app-id' : `${mailerService}`} //sets app name for service discovery
        });

        console.log(`mailerService: ${data}`);

        if (!apiKey || !domain) {
            throw new Error('APPSETTINGS_API_KEY and / or APPSETTINGS_DOMAIN not configured');
        }

        if (!prayerRequestFromEmail || !prayerRequestRecipientEmail) {
            throw new Error('APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL and / or APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL not configured');
        }

        // We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        const mailgun = new Mailgun({ apiKey, domain });

        const prayerRequest = {
            from: prayerRequestFromEmail,
            to: prayerRequestRecipientEmail,
            subject: 'Please could you pray for me',
            text: `Hi,

I'd love it if you could pray for me about this:

${prayFor}`
        };
        await mailgun.messages().send(prayerRequest);

        const text = await readFileAsPromise(path.join(__dirname, 'prayerResponse.txt'));
        const html = await readFileAsPromise(path.join(__dirname, 'prayerResponse.html'));
        const reassuringResponse = {
            from: prayerRequestFromEmail,
            to: email,
            subject: 'Your prayer request',
            text,
            html
        };
        await mailgun.messages().send(reassuringResponse);

        ctx.body = { ok: true, text: 'Thanks for sending your prayer request - we will pray.' };
    } catch (exc) {
        console.error(exc instanceof Error ? exc.message : exc);

        ctx.body = {
            success: false,
            text: `Your prayer request has not been sent - please try mailing: ${prayerRequestFromEmail}`
        };
    }
});

export const routes = router.routes();
