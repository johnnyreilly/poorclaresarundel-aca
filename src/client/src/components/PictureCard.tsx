import * as React from 'react';
import { Card, Image, Text } from '@mantine/core';
import classes from './PictureCard.module.css';

interface PictureCardProps {
    src: string;
    alt?: string;
    /** Floats the card to the left ("start") or right ("end") so that the following text wraps around it. */
    float?: 'start' | 'end';
    style?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    /** Optional caption shown beneath the picture. */
    children?: React.ReactNode;
}

/** A bordered picture with an optional caption. */
export function PictureCard({ src, alt = '', float, style, imageStyle, children }: PictureCardProps) {
    return (
        <Card withBorder padding={0} radius="md" className={classes.card} data-float={float} style={style}>
            <Image src={src} alt={alt} className={classes.image} style={imageStyle} />
            {children && (
                <Text component="div" className={classes.caption}>
                    {children}
                </Text>
            )}
        </Card>
    );
}
