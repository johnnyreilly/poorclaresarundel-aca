import * as React from 'react';
import ionaComingInDoor from './images/IonaComingInDoor.jpg';

export const homePath = '/home';

export const Home: React.FC<React.PropsWithChildren<unknown>> = (_props) => (
    <>
        <div className="rounded px-3 px-sm-4 py-3 py-sm-5">
            <h2>The Convent</h2>

            <p>A mini-site dedicated to the television programme &apos;The Convent&apos;.</p>

            <img src={ionaComingInDoor} alt="© Tiger Aspect Productions" className="img-thumbnail img-fluid" />

            <p />
            <p>Iona arrives...</p>
        </div>
        <footer>Photos in the Convent site by members of the TV crew.</footer>
    </>
);
