import { faYoutube } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Card, CardImg } from 'reactstrap';
import myPeaceIGiveYou from '../images/my-peace-i-give-you.avif';

export const myPeaceIGiveYouPath = '/my-peace-i-give-you';

export const MyPeaceIGiveYou: React.FC<React.PropsWithChildren<unknown>> = (_props) => (
    <>
        <Card className="float-right" style={{ marginLeft: '1em' }}>
            <CardImg top src={myPeaceIGiveYou} alt="My Peace I Give You album cover" />
        </Card>

        <h3>My Peace I Give You</h3>

        <p>
            Here is our album, 'My Peace I Give You' . Enjoy listening to our music. We hope it will help you find a
            place of peace and inner calm.
        </p>

        <p>To learn more check out these links:</p>

        <ul>
            <li>
                <a href="https://poorclares.lnk.to/MyPeaceIGiveYouSingle">Listen or buy here.</a>
            </li>

            <li>
                <a href="https://poorclares.lnk.to/MyPeaceIGiveYou">Pre-Order the album here.</a>
            </li>

            <li>
                <a href="https://youtu.be/YBWjI2PmTfc">Album trailer.</a>
            </li>

            <li>
                <a href="https://youtu.be/YBWjI2PmTfc">My Peace I Give You video.</a>
            </li>

            <li>
                <a
                    target="_blank"
                    href="https://canartsaveus.podbean.com/e/number-one-albums-in-hearts-minds-everywhere/"
                >
                    Sister Gabriel on the <em>Can Art Save Us</em> podcast discussing the album.
                </a>
            </li>
        </ul>
    </>
);
