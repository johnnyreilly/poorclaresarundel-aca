import { Link } from 'react-router';
import { Anchor, Container, Text, Title } from '@mantine/core';
import house from './images/house.jpg';
import myPeaceIGiveYou from './images/my-peace-i-give-you.avif';
import { myPeaceIGiveYouPath } from './main/MyPeaceIGiveYou';
import './Home.css';
import { Footer } from './components/Footer';

// https://schema.org/CatholicChurch
const catholicChurchStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CatholicChurch',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Crossbush, Arundel',
        postalCode: 'BN18 9PJ',
        streetAddress: 'Convent of Poor Clares',
    },
    email: 'arundel.poorclares@gmail.com',
    hasMap: 'https://goo.gl/maps/RYAL6WvbkAadDrTF9',
    telephone: '+441903882536',
    name: 'Convent of Poor Clares',
    description:
        'We are sisters, who share prayer, work, laughter and struggles, and live according to the Form of Life drawn up by St Clare of Assisi in 1253.',
    image: house,
};

export function Home() {
    return (
        <>
            <script type="application/ld+json">{JSON.stringify(catholicChurchStructuredData)}</script>
            <Container size="lg" p="md" ta="center">
                <header>
                    <Title order={2} fw={500} mb="xs">
                        Welcome to the Poor Clares of Arundel
                    </Title>
                </header>

                <main role="main" className="home-cover">
                    <Link to={myPeaceIGiveYouPath} title="We made an album...">
                        <img id="my-peace-i-give-you" src={myPeaceIGiveYou} alt="We made an album..." />
                    </Link>

                    <Link to="/us" title="Learn more about us...">
                        <img id="house" src={house} alt="Click here to enter..." />
                    </Link>
                    <Text size="xl" fw={300} mb="md">
                        We are sisters, who share prayer, work, laughter and struggles,
                        <br />
                        and live according to the Form of Life drawn up by St Clare of Assisi in 1253.
                    </Text>
                    <Text size="xl" fw={300}>
                        <Anchor inherit component={Link} to="/us">
                            Learn more about us...
                        </Anchor>
                    </Text>
                </main>
            </Container>
            <Footer />
        </>
    );
}
