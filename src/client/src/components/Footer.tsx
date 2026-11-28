import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, Text } from '@mantine/core';
import './Footer.css';

export function Footer() {
    return (
        <footer>
            <Text size="sm" mb="sm">
                © Community of Poor Clares, Arundel 2014-{new Date().getFullYear()}
                <br /> Convent of Poor Clares, Crossbush, Arundel, BN18 9PJ
            </Text>
            <Text size="sm">
                <Anchor inherit href="mailto:arundel.poorclares@gmail.com">
                    <FontAwesomeIcon icon={faEnvelope} /> arundel.poorclares@gmail.com
                </Anchor>{' '}
                |{' '}
                <Anchor inherit href="https://www.facebook.com/poorclaresarundel">
                    <FontAwesomeIcon icon={faFacebook} /> Facebook
                </Anchor>{' '}
                |{' '}
                <Anchor inherit target="_blank" href="/safeguarding-statement.docx">
                    safeguarding statement
                </Anchor>{' '}
                |{' '}
                <Anchor inherit target="_blank" href="/safeguarding-policy-and-procedures-2025.docx">
                    safeguarding policy
                </Anchor>{' '}
                |{' '}
                <Anchor inherit target="_blank" href="/poor-clares-arundel-audit.pdf">
                    safeguarding report
                </Anchor>
            </Text>
        </footer>
    );
}
