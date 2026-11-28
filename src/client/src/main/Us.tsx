import '@mantine/carousel/styles.css';
import { Button, Divider, Grid, Text, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel';
import communityAtPrayer from './images/Page2CommunityAtPrayer.jpg';
import prayingInChapel from './images/praying_in_chapel.jpg';
import coffeeTime from './images/coffee_time.jpg';
import librarian from './images/librarian.jpg';
import vegTeam from './images/veg_team.jpg';
import providenceGroup from './images/graca_and_yohanna.jpg';
import './Us.css';
import { useEffect, useRef, useState } from 'react';

export const usPath = '/us';

export function Us() {
    return (
        <Grid gap="xl">
            <Grid.Col span={{ base: 12, xs: 3, sm: 5, md: 6 }} py={{ base: 0, xs: 'xl' }}>
                <Title order={1} fz={{ base: 36, sm: 56 }} fw={300} lh={1.2} mb="xs">
                    About Us
                </Title>
                <Text size="xl" fw={300}>
                    Called to a life of prayer we seek to live the Gospel in and for our world of today. We share our
                    lives and all that we do.
                </Text>
                <Divider my="sm" />
                <Text mb="md">We are the Poor Clares of Arundel.</Text>
                <Button component="a" href="http://youtu.be/u_RlaYfJGbc" c="white" td="none">
                    See a slideshow of us here...
                </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 9, sm: 7, md: 6 }}>
                <UsCarousel />
            </Grid.Col>
        </Grid>
    );
}

const items = [
    {
        src: communityAtPrayer,
        caption: 'Called to a life of prayer',
    },
    {
        src: prayingInChapel,
        caption: 'we seek to live the Gospel',
    },
    {
        src: coffeeTime,
        caption: 'in and for',
    },
    {
        src: librarian,
        caption: 'our world of today.',
    },
    {
        src: vegTeam,
        caption: 'We share our lives',
    },
    {
        src: providenceGroup,
        caption: 'and all that we do.',
    },
];

function UsCarousel() {
    const [embla, setEmbla] = useState<EmblaCarouselType>();
    // As before, the slides only start to advance by themselves (every 5 seconds)
    // once the visitor has changed slide, and they pause while the mouse is over them.
    const [autoplay] = useState(() => Autoplay({ delay: 5000, playOnInit: false, stopOnInteraction: false }));
    const cycling = useRef(false);
    const hovering = useRef(false);

    const handleSlideChange = () => {
        cycling.current = true;
        if (!hovering.current) autoplay.play();
    };

    const handleMouseEnter = () => {
        hovering.current = true;
        autoplay.stop();
    };

    const handleMouseLeave = () => {
        hovering.current = false;
        if (cycling.current) autoplay.play();
    };

    // the left and right arrow keys change slide wherever the focus is on the page
    useEffect(() => {
        if (!embla) return;

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') embla.scrollPrev();
            if (event.key === 'ArrowRight') embla.scrollNext();
        };

        document.addEventListener('keyup', handleKeyUp);
        return () => document.removeEventListener('keyup', handleKeyUp);
    }, [embla]);

    return (
        <Carousel
            withIndicators
            withKeyboardEvents={false}
            emblaOptions={{ loop: true }}
            plugins={[autoplay]}
            getEmblaApi={setEmbla}
            onSlideChange={handleSlideChange}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            nextControlProps={{ 'aria-label': 'Next' }}
            previousControlProps={{ 'aria-label': 'Previous' }}
        >
            {items.map((item) => (
                <Carousel.Slide key={item.src} className="us-slide">
                    <img src={item.src} alt={item.caption} />
                    <h3>{item.caption}</h3>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
