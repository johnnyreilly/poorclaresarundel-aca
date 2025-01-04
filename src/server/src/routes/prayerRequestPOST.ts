import FormData from 'form-data';
import Router from 'koa-router';
import mgjs from 'mailgun.js';

import { config } from '../config.js';

export function prayerRequestPOST(): Router.IMiddleware<unknown, unknown> {
    return async (ctx, _next) => {
        console.log('prayerRequestPOST');
        // Invokes the method to send emails given the above data with the helper library
        try {
            const { email, prayFor } = ctx.request.body;

            if (!config.apiKey || !config.domain) {
                throw new Error('APPSETTINGS_API_KEY and / or APPSETTINGS_DOMAIN not configured');
            }

            if (!config.prayerRequestFromEmail || !config.prayerRequestRecipientEmail) {
                throw new Error(
                    'APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL and / or APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL not configured'
                );
            }

            // We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
            // const mailgun = new Mailgun({ apiKey, domain });
            const mailgun = new mgjs.default(FormData);
            const mg = mailgun.client({ username: 'api', key: config.apiKey });

            const prayerRequest = {
                from: email, // prayerRequestFromEmail,
                to: config.prayerRequestRecipientEmail,
                subject: 'Please could you pray for me',
                text: `Hi,

I'd love it if you could pray for me about this:

${prayFor}`,
            };
            // await mailgun.messages().send(prayerRequest);
            await mg.messages.create(config.domain, prayerRequest);

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
                from: config.prayerRequestFromEmail,
                to: email,
                subject: 'Your prayer request',
                text,
                html,
            };
            // await mailgun.messages().send(reassuringResponse);
            await mg.messages.create(config.domain, reassuringResponse);

            ctx.body = { ok: true, text: 'Thanks for sending your prayer request - we will pray.' };
        } catch (exc) {
            console.error(exc instanceof Error ? exc.message : exc);

            ctx.body = {
                success: false,
                text: `Your prayer request has not been sent - please try mailing: ${config.prayerRequestFromEmail}`,
            };
        }
    };
}
