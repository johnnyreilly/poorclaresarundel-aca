import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import communityAtPrayer from './images/Page2CommunityAtPrayer.jpg';
import prayingInChapel from './images/praying_in_chapel.jpg';
import coffeeTime from './images/coffee_time.jpg';
import librarian from './images/librarian.jpg';
import vegTeam from './images/veg_team.jpg';
import providenceGroup from './images/graca_and_yohanna.jpg';
import './Us.css';
import { useState } from 'react';

export const usPath = '/us';

export function Us() {
    return (
        <div className="row">
            <div className="col-lg-6 col-md-5 col-sm-3 col-xs-12">
                <div className="rounded px-3 px-sm-4 py-3 py-sm-5">
                    <h1 className="display-4">About Us</h1>
                    <p className="lead">
                        Called to a life of prayer we seek to live the Gospel in and for our world of today. We share
                        our lives and all that we do.
                    </p>
                    <hr className="my-2" />
                    <p>We are the Poor Clares of Arundel.</p>
                    <p className="lead">
                        <a className="btn btn-primary" href="http://youtu.be/u_RlaYfJGbc">
                            See a slideshow of us here...
                        </a>
                    </p>
                </div>
            </div>
            <div className="col-lg-6 col-md-7 col-sm-9 col-xs-12">
                <UsCarousel />
            </div>
        </div>
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex: number) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
                <img src={item.src} alt={item.caption} />
                <CarouselCaption captionText="" captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    return (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}
