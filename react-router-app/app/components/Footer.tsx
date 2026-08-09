import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';

export function Footer() {
    return (
        // <div className="text-center">
        // <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

        <footer className="cover-container d-flex w-100 flex-column text-center mastfoot mt-auto">
            <div className="inner">
                <p>
                    © Community of Poor Clares, Arundel 2014-{new Date().getFullYear()}
                    <br /> Convent of Poor Clares, Crossbush, Arundel, BN18 9PJ
                </p>
                <p>
                    <a href="mailto:arundel.poorclares@gmail.com">
                        <FontAwesomeIcon icon={faEnvelope} /> arundel.poorclares@gmail.com
                    </a>{' '}
                    <a href="https://www.facebook.com/poorclaresarundel">
                        <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </a>
                </p>
            </div>
        </footer>
    );
}
