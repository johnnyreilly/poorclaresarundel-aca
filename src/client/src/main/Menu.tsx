import { Container, Menu as Dropdown } from '@mantine/core';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Navbar, NavBrand, NavDropdown, NavExternalLink, NavLink } from '../components/Navbar';
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
    return (
        <div className="header">
            <div className="header-image header-image-main" />
            <Container size="lg">
                <Navbar brand={<NavBrand to={homePath}>Poor Clares</NavBrand>}>
                    <NavDropdown label="Our Life">
                        <Dropdown.Item component={Link} to={ourPrayerPath}>
                            Our prayer
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={ourWorkPath}>
                            Our work
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={ourShopPath}>
                            Our shop
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                            component="a"
                            target="_blank"
                            href="https://youtu.be/y_d-T74WEO0"
                            rel="noreferrer"
                        >
                            Sister Gabriel answers your questions on LADbible
                        </Dropdown.Item>
                        <Dropdown.Item
                            component="a"
                            target="_blank"
                            href="https://canartsaveus.podbean.com/e/number-one-albums-in-hearts-minds-everywhere/"
                            rel="noreferrer"
                        >
                            Sister Gabriel on the <em>Can Art Save Us</em> podcast
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item component="a" href={tripAroundGuestHouse}>
                            Trip around the guesthouse
                        </Dropdown.Item>
                        <Dropdown.Item component="a" href={communityTripAroundHouse}>
                            Trip around the house
                        </Dropdown.Item>
                    </NavDropdown>
                    <NavDropdown label="Community">
                        <Dropdown.Label>Sister&apos;s stories</Dropdown.Label>
                        <Dropdown.Item component={Link} to={sisterAnnPath}>
                            Sister Ann
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={sisterClareAgnesPath}>
                            Sister Clare Agnes
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={sisterClareRuvaPath}>
                            Sister Clare Ruva
                        </Dropdown.Item>
                        {/* <Dropdown.Item component={Link} to={sisterGabrielPath}>Sister Gabriel</Dropdown.Item> */}
                        <Dropdown.Item component={Link} to={sisterGracaPath}>
                            Sister Graça
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={sisterJosephPath}>
                            Sister Joseph
                        </Dropdown.Item>
                        {/* <Dropdown.Item component={Link} to={sisterMariaPath}>Sister Maria</Dropdown.Item> */}
                        <Dropdown.Item component={Link} to={interviewsPath}>
                            Interviews with Sisters
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item component={Link} to={arundelPath}>
                            Arundel Community
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={vocationPath}>
                            Vocation
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Label>Foundation</Dropdown.Label>
                        <Dropdown.Item component={Link} to={kenyaPath}>
                            Kenya
                        </Dropdown.Item>
                    </NavDropdown>
                    <NavDropdown label="Beginnings">
                        <Dropdown.Item component={Link} to={claresStoryPath}>
                            Clares Story
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={claresThoughtsPath}>
                            Clares Thoughts
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={claresPrayersPath}>
                            Clares Prayers
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item component={Link} to={francisLifePath}>
                            Francis Life
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={francisThoughtsPath}>
                            Francis Thoughts
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={francisPrayersPath}>
                            Francis Prayers
                        </Dropdown.Item>
                    </NavDropdown>
                    <NavDropdown label="Misc">
                        <Dropdown.Item component={Link} to={faqsPath}>
                            FAQs
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={linksPath}>
                            Links
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={glossaryPath}>
                            Glossary
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={addressesPath}>
                            Addresses
                        </Dropdown.Item>
                    </NavDropdown>
                    <NavLink to={eventsPath}>Events</NavLink>
                    <NavLink to={donatePath}>Donate</NavLink>
                    <NavLink to={prayerRequestsPath}>Prayer Requests</NavLink>

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
                    <NavDropdown label="Our Music">
                        <Dropdown.Item component={Link} to={christmasPath}>
                            Christmas 2024
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={lightForTheWorldPath}>
                            Light for the World
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={myPeaceIGiveYouPath}>
                            My Peace I Give You
                        </Dropdown.Item>
                    </NavDropdown>

                    <NavExternalLink href="https://youtu.be/URlqwrgphRc">The Convent</NavExternalLink>
                    <NavExternalLink href="https://www.facebook.com/poorclaresarundel">
                        <FontAwesomeIcon icon={faFacebook} />
                    </NavExternalLink>
                    <NavExternalLink href="https://www.youtube.com/channel/UCenwZN21CYRbwwWtqqf7v0w">
                        <FontAwesomeIcon icon={faYoutube} />
                    </NavExternalLink>
                </Navbar>
            </Container>
        </div>
    );
}
