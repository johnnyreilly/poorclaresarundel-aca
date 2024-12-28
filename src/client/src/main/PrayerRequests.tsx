import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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

    const handlePrayForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRequestPrayFor(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitAttempted(true);
        setMessage({ ok: true, text: 'Sending...' });

        try {
            const rawResponse = await fetch('/api/PrayerRequest', {
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
        <Container>
            <Row>
                <Col>
                    <h1>Prayer Requests</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="requestEmail">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="requestEmail"
                                value={requestEmail}
                                onChange={handleEmailChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="requestPrayFor">Your Prayer Request</Label>
                            <Input
                                type="textarea"
                                name="prayFor"
                                id="requestPrayFor"
                                value={requestPrayFor}
                                onChange={handlePrayForChange}
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </Form>
                    {formSubmitAttempted && message && <p>{message.text}</p>}
                </Col>
            </Row>
        </Container>
    );
}
