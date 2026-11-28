import * as React from 'react';
import { PictureCard } from '../components/PictureCard';
import ionaComingInDoor from './images/IonaComingInDoor.jpg';

export const homePath = '/home';

export const Home: React.FC<React.PropsWithChildren<unknown>> = (_props) => (
    <>
        <div>
            <h2>The Convent</h2>

            <p>A mini-site dedicated to the television programme &apos;The Convent&apos;.</p>

            <PictureCard src={ionaComingInDoor} alt="© Tiger Aspect Productions" />

            <p />
            <p>Iona arrives...</p>
        </div>
        <footer>Photos in the Convent site by members of the TV crew.</footer>
    </>
);
