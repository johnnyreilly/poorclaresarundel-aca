import { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    NavbarBrand,
} from 'reactstrap';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import communityFoundationsHollington from '../static/communityFoundationsHollington.pdf';
import tripAroundGuestHouse from '../static/tripAroundGuestHouse.pdf';
import communityTripAroundHouse from '../static/communityTripAroundHouse.pdf';
import { ourPrayerPath } from './our-life/OurPrayer';
import { ourShopPath } from './our-life/OurShop';
import { ourWorkPath } from './our-life/OurWork';
import { sisterAnnPath } from './community/SisterAnn';
import { sisterClareAgnesPath } from './community/SisterClareAgnes';
import { sisterClareRuvaPath } from './community/SisterClareRuva';
import { sisterGracaPath } from './community/SisterGraca';
import { sisterJosephPath } from './community/SisterJoseph';
import { interviewsPath } from './community/Interviews';
import { arundelPath } from './community/Arundel';
import { claresStoryPath } from './beginnings/ClaresStory';
import { claresThoughtsPath } from './beginnings/ClaresThoughts';
import { claresPrayersPath } from './beginnings/ClaresPrayers';
import { francisLifePath } from './beginnings/FrancisLife';
import { francisThoughtsPath } from './beginnings/FrancisThoughts';
import { francisPrayersPath } from './beginnings/FrancisPrayers';
import { eventsPath } from './Events';
import { donatePath } from './Donate';
import { faqsPath } from './misc/FAQs';
import { linksPath } from './misc/Links';
import { glossaryPath } from './misc/Glossary';
import { addressesPath } from './misc/Addresses';
import { vocationPath } from './community/Vocation';
import { kenyaPath } from './community/Kenya';
import { prayerRequestsPath } from './PrayerRequests';
import { lightForTheWorldPath } from './LightForTheWorld';
import { homePath } from '../the-convent/Home';
import { myPeaceIGiveYouPath } from './MyPeaceIGiveYou';
import { christmasPath } from './Christmas';

import './Menu.css';

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="bg-primary">
            <div className="header-image header-image-main" />
            <Container>
                <Navbar dark expand="md">
                    <NavbarBrand>
                        <Link className="navbar-brand" to={homePath}>
                            Poor Clares
                        </Link>
                    </NavbarBrand>

                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Our Life
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={ourPrayerPath}>Our prayer</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={ourWorkPath}>Our work</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={ourShopPath}>Our shop</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <a target="_blank" href="https://youtu.be/y_d-T74WEO0" rel="noreferrer">
                                            Sister Gabriel answers your questions on LADbible
                                        </a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a
                                            target="_blank"
                                            href="https://canartsaveus.podbean.com/e/number-one-albums-in-hearts-minds-everywhere/"
                                            rel="noreferrer"
                                        >
                                            Sister Gabriel on the <em>Can Art Save Us</em> podcast
                                        </a>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <a href={tripAroundGuestHouse}>Trip around the guesthouse</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a href={communityTripAroundHouse}>Trip around the house</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Community
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Sister&apos;s stories</DropdownItem>
                                    <DropdownItem>
                                        <Link to={sisterAnnPath}>Sister Ann</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={sisterClareAgnesPath}>Sister Clare Agnes</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={sisterClareRuvaPath}>Sister Clare Ruva</Link>
                                    </DropdownItem>
                                    {/* <DropdownItem>
                                    <Link to={sisterGabrielPath}>Sister Gabriel</Link>
                                </DropdownItem> */}
                                    <DropdownItem>
                                        <Link to={sisterGracaPath}>Sister Graça</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={sisterJosephPath}>Sister Joseph</Link>
                                    </DropdownItem>
                                    {/* <DropdownItem>
                                    <Link to={sisterMariaPath}>Sister Maria</Link>
                                </DropdownItem> */}
                                    <DropdownItem>
                                        <Link to={interviewsPath}>Interviews with Sisters</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to={arundelPath}>Arundel Community</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={vocationPath}>Vocation</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem header>Foundations</DropdownItem>
                                    <DropdownItem>
                                        <Link to={kenyaPath}>Kenya</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a href={communityFoundationsHollington}>Hollington</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Beginnings
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={claresStoryPath}>Clares Story</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={claresThoughtsPath}>Clares Thoughts</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={claresPrayersPath}>Clares Prayers</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to={francisLifePath}>Francis Life</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={francisThoughtsPath}>Francis Thoughts</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={francisPrayersPath}>Francis Prayers</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Misc
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={faqsPath}>FAQs</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={linksPath}>Links</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={glossaryPath}>Glossary</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={addressesPath}>Addresses</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <Link className="nav-link" to={eventsPath}>
                                    Events
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to={donatePath}>
                                    Donate
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to={prayerRequestsPath}>
                                    Prayer Requests
                                </Link>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            {/* <NavLink href={lifeInAConvent} title="The Stylist magazine wrote an article about us.">
                            The Stylist
                        </NavLink>
                        <NavItem>
                            <Link
                                className="nav-link"
                                to={theConventPath}
                                title="The BBC made a television programme about us."
                            >
                                The Convent
                            </Link>
                        </NavItem> */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Our Music
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={christmasPath}>Christmas 2024</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={lightForTheWorldPath}>Light for the World</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={myPeaceIGiveYouPath}>My Peace I Give You</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                                <a
                                    className="nav-link"
                                    target="_blank"
                                    href="https://youtu.be/URlqwrgphRc"
                                    rel="noreferrer"
                                >
                                    The Convent
                                </a>
                            </NavItem>
                            <NavItem>
                                <a
                                    className="nav-link"
                                    target="_blank"
                                    href="https://www.facebook.com/poorclaresarundel"
                                    rel="noreferrer"
                                >
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </NavItem>
                            <NavItem>
                                <a
                                    className="nav-link"
                                    target="_blank"
                                    href="https://www.youtube.com/channel/UCenwZN21CYRbwwWtqqf7v0w"
                                    rel="noreferrer"
                                >
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        </div>
    );
}
