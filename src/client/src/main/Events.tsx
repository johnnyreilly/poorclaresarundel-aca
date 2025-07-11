import * as React from 'react';
import { Card, CardImg } from 'reactstrap';
import stClareStatue from './images/StClareStatue.jpg';
import stFrancis from './images/StFrancis.jpg';
import strewnCross from './images/strewnCross.jpg';
import easterVigil from './images/EasterVigil.jpg';
import crib from './images/crib.jpg';
import taize from './images/Taize.png';

export const eventsPath = '/events';

export const Events: React.FC<React.PropsWithChildren<unknown>> = (_props) => {
    const eventStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Christmas',
        startDate: '2021-12-24T17:30',
        endDate: '2021-12-25T10:00',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
            '@type': 'Place',
            name: 'Convent of Poor Clares ',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Crossbush, Arundel',
                postalCode: 'BN18 9PJ',
                streetAddress: 'Convent of Poor Clares',
            },
        },
        image: [crib],
        description: `Christmas Eve - 5.30pm: 1st Vespers, 11.15pm: Blessing of the Crib and Midnight Mass.
Christmas Day - 8.30am: Christmas Morning Mass, please join us for refreshments afterwards`,
        organizer: {
            '@type': 'CatholicChurch',
            name: 'Convent of Poor Clares',
            url: 'https://www.poorclaresarundel.org/',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(eventStructuredData),
                }}
            />
            <h3>Events</h3>

            <h4>Regular Events</h4>

            <p>
                The Poor Clares are glad to be able to welcome anyone who comes to join them in their times of prayer.
                Our regular timetable is:
            </p>

            <ul>
                <li>
                    <b>7.30 am</b> Morning Prayer (except Thursday)
                </li>

                <li>
                    <b>8.30am Monday to Saturday</b> Holy Mass
                </li>

                <li>
                    <b>9 am (ish)</b> Office of the Passion
                </li>

                <li>
                    <b>12 noon</b> Office of Readings
                </li>

                <li>
                    <b>5.30 pm</b> Weekdays Evening Prayer (except Wednesday)
                </li>

                <li>
                    <b>6 pm</b> Supper
                </li>

                <li>
                    <b>7.30 pm</b> Compline or Night Prayer
                </li>
            </ul>

            <h5>Saturdays</h5>

            <ul>
                <li>
                    <b>5.30 pm</b> Evening Prayer
                </li>
            </ul>

            <h5>Sundays</h5>

            <ul>
                <li>
                    <b>8-9 am</b> Exposition of the Blessed Sacrament
                </li>

                <li>
                    <b>5.15 pm</b> Evening Prayer
                </li>

                <li>
                    <b>6 pm</b> Holy Mass
                </li>
            </ul>

            <p>
                All times can be subject to occasional change, so if travelling a distance you might like to phone to
                check.
            </p>

            <h4>Annual Events</h4>
            <p>Come and join us for these events which take place throughout the year!</p>

            <h4>Franciscan Celebrations</h4>

            <Card className="float-end">
                <CardImg top src={stClareStatue} />
            </Card>

            <h5>Solemnity of St Clare</h5>

            <p>12th August - 8:30 Mass of St Clare</p>

            <Card className="float-end">
                <CardImg top src={stFrancis} />
            </Card>

            <h5>Solemnity of St. Francis: 4th October</h5>

            <p>3rd October – Transitus with 1st Vespers: 5.30pm</p>

            <p>4th October – Mass of St. Francis: 8.30am</p>

            <h5>The Easter Triduum</h5>

            <h6>Maundy Thursday</h6>

            <p>Mass of the Lord’s Supper: 6.30pm</p>

            <Card className="float-end">
                <CardImg top src={strewnCross} />
            </Card>

            <h6>Good Friday</h6>

            <p>Liturgy of the Passion: 3pm</p>
            <p>Way of the Cross: 5.30pm</p>

            <Card className="float-end">
                <CardImg top src={easterVigil} />
            </Card>

            <h6>Holy Saturday</h6>

            <p>Easter Vigil: 8.30pm</p>

            <h6>Easter Sunday</h6>

            <p>Easter Morning Mass: 8.30am</p>

            <h4>Christmas</h4>

            <h5>Christmas Eve</h5>

            <p>5pm Evening Prayer</p>

            <p>8.30pm Office of Readings and blessing of the Crib</p>

            <Card className="float-end">
                <CardImg top src={crib} />
            </Card>

            <h5>Christmas Day</h5>

            <p>7.30am Morning Prayer</p>

            <p>8.30am Holy Mass</p>

            <Card className="float-start">
                <CardImg top src={taize} />
            </Card>

            <h5>Taize Evening</h5>

            <p>Usually every last Friday of the month (except December): 7.15 - 8.15</p>
            <p>...round the Cross with Scripture, song and silence</p>

            <h6>Every Tuesday</h6>
            <p>John Main Meditation Group: 7:15pm</p>
        </>
    );
};
