import * as React from 'react';
import { Container, Typography } from '@mantine/core';
import classes from './PageContent.module.css';

/** Centres a page and gives its plain HTML (headings, paragraphs, lists, links) the site's typography. */
export function PageContent({ children }: React.PropsWithChildren) {
    return (
        <Container size="lg" component="main" className={classes.content}>
            <Typography>{children}</Typography>
        </Container>
    );
}
