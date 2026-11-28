import { Link } from 'react-router';
import { Container, Menu as Dropdown } from '@mantine/core';
import { Navbar, NavBrand, NavDropdown, NavLink } from '../components/Navbar';
import { whyPath } from './Why';
import { angelaPath } from './seekers/Angela';
import { debiPath } from './seekers/Debi';
import { ionaPath } from './seekers/Iona';
import { vikPath } from './seekers/Vik';
import { producersCommentsPath } from './production-team/ProducersComments';
import { photoGalleryPath } from './production-team/PhotoGallery';
import { guidedPrayerPath } from './GuidedPrayer';

interface IProps {
    conventRootPath: string;
}

export function Menu({ conventRootPath }: IProps) {
    return (
        <div className="header">
            <div className="header-image header-image-the-convent" />
            <Container size="lg">
                <Navbar brand={<NavBrand to={conventRootPath}>The Convent</NavBrand>}>
                    <NavLink to={`${conventRootPath}${whyPath}`}>Why</NavLink>
                    <NavDropdown label="Seekers">
                        <Dropdown.Item component={Link} to={`${conventRootPath}${angelaPath}`}>
                            Angela
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={`${conventRootPath}${debiPath}`}>
                            Debi
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={`${conventRootPath}${ionaPath}`}>
                            Iona
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={`${conventRootPath}${vikPath}`}>
                            Vik
                        </Dropdown.Item>
                    </NavDropdown>
                    <NavDropdown label="Production Team">
                        <Dropdown.Item component={Link} to={`${conventRootPath}${producersCommentsPath}`}>
                            Producer&apos;s Comments
                        </Dropdown.Item>
                        <Dropdown.Item component={Link} to={`${conventRootPath}${photoGalleryPath}`}>
                            Photo Gallery
                        </Dropdown.Item>
                    </NavDropdown>
                    <NavLink to={`${conventRootPath}${guidedPrayerPath}`}>Guided Prayer</NavLink>

                    <NavLink to="/">Back to main site</NavLink>
                </Navbar>
            </Container>
        </div>
    );
}
