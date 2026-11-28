import * as React from 'react';
import { AspectRatio } from '@mantine/core';

export const interviewsPath = '/community-interviews';

export const Interviews: React.FC<React.PropsWithChildren<unknown>> = (_props) => (
    <>
        <h3>Interviews with Sisters</h3>

        <p>Here a number of interviews with some of the sisters:</p>

        <h4>Sister Pat</h4>

        <AspectRatio ratio={16 / 9} maw={640} mb="md">
            <iframe
                src="https://www.youtube.com/embed/Z13ZVI5ZARw"
                allowFullScreen
                title="Sister Pat interview"
                style={{ border: 0 }}
            />
        </AspectRatio>

        <h4>Sister Gabriel</h4>

        <AspectRatio ratio={16 / 9} maw={640} mb="md">
            <iframe
                src="https://www.youtube.com/embed/4wwaRR4jnuc"
                allowFullScreen
                title="Sister Gabriel interview"
                style={{ border: 0 }}
            />
        </AspectRatio>
        <AspectRatio ratio={16 / 9} maw={640} mb="md">
            <iframe
                src="https://www.youtube.com/embed/y_d-T74WEO0"
                allowFullScreen
                title="Sister Gabriel interview on LADbible"
                style={{ border: 0 }}
            />
        </AspectRatio>

        <h4>Sister Angela</h4>

        <AspectRatio ratio={16 / 9} maw={640} mb="md">
            <iframe
                src="https://www.youtube.com/embed/RCWEawlX4Tc"
                allowFullScreen
                title="Sister Angela interview"
                style={{ border: 0 }}
            />
        </AspectRatio>

        <h4>Sister Aelred</h4>

        <AspectRatio ratio={16 / 9} maw={640} mb="md">
            <iframe
                src="https://www.youtube.com/embed/qpXROehsm48"
                allowFullScreen
                title="Sister Aelred interview"
                style={{ border: 0 }}
            />
        </AspectRatio>
    </>
);
