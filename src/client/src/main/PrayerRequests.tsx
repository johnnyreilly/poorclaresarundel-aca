import React, { useState } from 'react';
import smalltau from './images/smalltau.jpg';
import { Alert } from 'reactstrap';
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
                <Alert color={message.ok ? 'success' : 'danger'}>
                    <img className="img-thumbnail" src={smalltau} alt={message.ok ? 'success' : 'failure'} />
                    {message.text}
                </Alert>
            )}

            <form name="form" noValidate onSubmit={handleSubmit}>
                <div className={`form-group has-feedback ${formSubmitAttempted && !requestEmail ? 'has-error' : ''}`}>
                    <label className="control-label">Email address</label>
                    <input
                        name="emailAddr"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={requestEmail}
                        onChange={handleEmailChange}
                        required
                    />
                    {formSubmitAttempted && !requestEmail && <span>Tell us your email.</span>}
                </div>
                <div>
                    <label className="control-label">Your prayer request</label>
                    <textarea
                        name="prayForText"
                        className="form-control"
                        rows={3}
                        placeholder="Enter prayer request"
                        value={requestPrayFor}
                        onChange={handlePrayForChange}
                        required
                    />
                    {formSubmitAttempted && !requestPrayFor && <span>You must tell us something to pray for!</span>}
                </div>
                <button disabled={!requestEmail || !requestPrayFor} type="submit" className="btn btn-primary">
                    Send us your prayer request
                </button>
            </form>

            <p>Although you may only receive a standardised reply, you can be confident that we will indeed pray.</p>
        </>
    );
}
