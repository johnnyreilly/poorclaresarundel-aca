import { koaBody } from 'koa-body';
import * as Router from 'koa-router';
import * as Mailgun from 'mailgun-js';

const router = new Router();

const apiKey = process.env.APPSETTINGS_API_KEY; // long guid from mailgun
const domain = process.env.APPSETTINGS_DOMAIN; // eg 'mg.priou.co.uk';
const prayerRequestFromEmail = process.env.APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL;
const prayerRequestRecipientEmail = process.env.APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL;

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
router.post('/api/PrayerRequest', koaBody(), async (ctx, _next) => {
    // Invokes the method to send emails given the above data with the helper library
    try {
        const { email, prayFor } = ctx.request.body;

        if (!apiKey || !domain) {
            throw new Error('APPSETTINGS_API_KEY and / or APPSETTINGS_DOMAIN not configured');
        }

        if (!prayerRequestFromEmail || !prayerRequestRecipientEmail) {
            throw new Error(
                'APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL and / or APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL not configured',
            );
        }

        // We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        const mailgun = new Mailgun({ apiKey, domain });

        const prayerRequest = {
            from: email, // prayerRequestFromEmail,
            to: prayerRequestRecipientEmail,
            subject: 'Please could you pray for me',
            text: `Hi,

I'd love it if you could pray for me about this:

${prayFor}`,
        };
        await mailgun.messages().send(prayerRequest);

        const text = `Thank you for your prayer request.

You are in our thoughts and prayers.

Your Poor Clare sisters, Arundel.`;

        const html = `<html>
<head>
    <title>Thank you for your prayer request.</title>
</head>
<body>
    <div>
        <img src="https://www.poorclaresarundel.org/prayer-request-image.webp" />
    </div>
    <div style="padding:10px;font-family: Verdana, Helvetica, Sans-Serif;">
        <p>Thank you for your prayer request.</p>

        <p>You are in our thoughts and prayers.</p>

        <p>Your Poor Clare sisters, Arundel.</p>
    </div>
</body>
</html>`;

        const reassuringResponse = {
            from: prayerRequestFromEmail,
            to: email,
            subject: 'Your prayer request',
            text,
            html,
        };
        await mailgun.messages().send(reassuringResponse);

        ctx.body = { ok: true, text: 'Thanks for sending your prayer request - we will pray.' };
    } catch (exc) {
        console.error(exc instanceof Error ? exc.message : exc);

        ctx.body = {
            success: false,
            text: `Your prayer request has not been sent - please try mailing: ${prayerRequestFromEmail}`,
        };
    }
});

export const routes = router.routes();
