import { useState } from 'react';
import { Link } from 'react-router';
import {
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
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
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <div className="header-image header-image-the-convent" />

            <Navbar dark className="bg-primary" expand="md">
                <div className="rounded px-3 px-sm-4 py-3 py-sm-5">
                    <Link to={conventRootPath} className="navbar-brand">
                        The Convent
                    </Link>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to={`${conventRootPath}${whyPath}`}>
                                    Why
                                </Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Seekers
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to={`${conventRootPath}${angelaPath}`}>Angela</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`${conventRootPath}${debiPath}`}>Debi</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`${conventRootPath}${ionaPath}`}>Iona</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`${conventRootPath}${vikPath}`}>Vik</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Production Team
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to={`${conventRootPath}${producersCommentsPath}`}>
                                            Producer&apos;s Comments
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`${conventRootPath}${photoGalleryPath}`}>Photo Gallery</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <Link className="nav-link" to={`${conventRootPath}${guidedPrayerPath}`}>
                                    Guided Prayer
                                </Link>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to="/">
                                    Back to main site
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </>
    );
}
