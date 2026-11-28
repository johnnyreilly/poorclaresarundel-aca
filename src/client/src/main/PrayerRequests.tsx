import React, { useState } from 'react';
import smalltau from './images/smalltau.jpg';
import { Alert, Button, Stack, Textarea, TextInput } from '@mantine/core';
export const prayerRequestsPath = '/prayer-requests';

interface IPrayerRequestResult {
    ok: boolean;
    text: string;
}

export function PrayerRequests() {
    const [requestEmail, setRequestEmail] = useState('');
    const [requestPrayFor, setRequestPrayFor] = useState('');
    const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
    const [message, setMessage] = useState<IPrayerRequestResult>();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRequestEmail(event.target.value);
    };

    const handlePrayForChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRequestPrayFor(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitAttempted(true);
        setMessage({ ok: true, text: 'Sending...' });

        try {
            const rawResponse = await fetch('/api/prayer-request', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: requestEmail, prayFor: requestPrayFor }),
            });
            const message = (await rawResponse.json()) as IPrayerRequestResult;
            setMessage(message);
        } catch (error) {
            console.error('Prayer request failure', error);
            setMessage({ ok: false, text: 'Failed to send request' });
        }
    };

    return (
        <>
            <h3>Prayer Requests</h3>

            <p>If you would like to ask the community to pray for a special intention mail us a prayer request:</p>

            {message && (
                <Alert
                    color={message.ok ? 'green' : 'red'}
                    mb="md"
                    icon={<img src={smalltau} alt={message.ok ? 'success' : 'failure'} />}
                    styles={{ icon: { width: 'auto', height: 'auto' }, message: { fontSize: 'inherit' } }}
                    role="alert"
                >
                    {message.text}
                </Alert>
            )}

            <form name="form" noValidate onSubmit={handleSubmit}>
                <Stack gap="sm" align="flex-start" mb="md">
                    <TextInput
                        w="100%"
                        label="Email address"
                        name="emailAddr"
                        type="email"
                        placeholder="Enter email"
                        value={requestEmail}
                        onChange={handleEmailChange}
                        error={formSubmitAttempted && !requestEmail && 'Tell us your email.'}
                        required
                        withAsterisk={false}
                    />
                    <Textarea
                        w="100%"
                        label="Your prayer request"
                        name="prayForText"
                        rows={3}
                        placeholder="Enter prayer request"
                        value={requestPrayFor}
                        onChange={handlePrayForChange}
                        error={formSubmitAttempted && !requestPrayFor && 'You must tell us something to pray for!'}
                        required
                        withAsterisk={false}
                    />
                    <Button disabled={!requestEmail || !requestPrayFor} type="submit">
                        Send us your prayer request
                    </Button>
                </Stack>
            </form>

            <p>Although you may only receive a standardised reply, you can be confident that we will indeed pray.</p>
        </>
    );
}
