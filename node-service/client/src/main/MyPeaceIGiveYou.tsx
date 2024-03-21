import { faYoutube } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Card, CardImg } from 'reactstrap';
import myPeaceIGiveYou from '../images/my-peace-i-give-you.avif';

export const myPeaceIGiveYouPath = '/my-peace-i-give-you';

/*
Listen or Buy here: https://poorclares.lnk.to/MyPeaceIGiveYouSingle
Pre-Order the album here: https://poorclares.lnk.to/MyPeaceIGiveYou
Album Trailer (This will go live on Friday 22nd): https://youtu.be/YBWjI2PmTfc
My Peace I Give You Video (This will go live on Monday 24th): https://youtu.be/YBWjI2PmTfc
 */

export const MyPeaceIGiveYou: React.FC<React.PropsWithChildren<unknown>> = (_props) => (
    <>
        <Card className="float-right">
            <CardImg top src={myPeaceIGiveYou} />
        </Card>

        <h3>My Peace I Give You</h3>

        <p>
            Here is our album, 'My Peace I Give You' . Enjoy listening to our music. We hope it will help you find a
            place of peace and inner calm.
        </p>

        <p>
            <a href="https://poorclares.lnk.to/MyPeaceIGiveYouSingle">Listen or Buy here</a>
        </p>

        <p>
            <a href="https://poorclares.lnk.to/MyPeaceIGiveYou">Pre-Order the album here</a>
        </p>

        <p>
            <a href="https://youtu.be/YBWjI2PmTfc">Album Trailer (This will go live on Friday 22nd)</a>
        </p>

        <p>
            <a href="https://youtu.be/YBWjI2PmTfc">My Peace I Give You Video (This will go live on Monday 24th)</a>
        </p>

        {/* <p>
            <a href="https://www.youtube.com/watch?v=zs5rGW-RE38">
                <FontAwesomeIcon icon={faYoutube} /> The video on YouTube
            </a>
        </p> */}

        {/* <iframe
            title="O Come Emmanuel"
            width={560}
            height={315}
            src="https://www.youtube-nocookie.com/embed/sVdHG_cst8Q"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe> */}
    </>
);
