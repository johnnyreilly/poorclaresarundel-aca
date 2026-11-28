import * as React from 'react';
import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Burger, Collapse, Group, Menu, Stack, UnstyledButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Navbar.module.css';

interface NavbarProps {
    /** The brand link shown at the start of the bar */
    brand: React.ReactNode;
    /** Navigation items: `NavLink`, `NavExternalLink` and `NavDropdown` elements */
    children: React.ReactNode;
}

/**
 * The brown navigation bar. From the `sm` breakpoint up the items sit in a row;
 * below it they are tucked behind a burger button.
 */
export function Navbar({ brand, children }: NavbarProps) {
    const { pathname } = useLocation();
    // remember where the menu was opened, so that it closes itself upon navigating elsewhere
    const [openedAt, setOpenedAt] = useState<string>();
    const opened = openedAt === pathname;

    return (
        <nav className={classes.navbar}>
            <Group justify="space-between" wrap="nowrap">
                {brand}
                <Group gap={0} visibleFrom="sm" className={classes.items}>
                    {children}
                </Group>
                <Burger
                    hiddenFrom="sm"
                    color="white"
                    opened={opened}
                    onClick={() => setOpenedAt(opened ? undefined : pathname)}
                    aria-label="Toggle navigation"
                />
            </Group>
            <Collapse expanded={opened} hiddenFrom="sm">
                <Stack gap={0} align="flex-start" pt="xs">
                    {children}
                </Stack>
            </Collapse>
        </nav>
    );
}

interface NavDropdownProps {
    label: string;
    /** `Menu.Item`, `Menu.Label` and `Menu.Divider` elements */
    children: React.ReactNode;
}

export function NavDropdown({ label, children }: NavDropdownProps) {
    const [opened, setOpened] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // The dropdown is kept mounted so that its links are always in the page for search engines to follow.
    // Mantine does not move the focus into a mounted dropdown itself, so the keyboard is handled here:
    // the down arrow moves from the button into the open dropdown, and Escape closes it.
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpened(false);
        } else if (event.key === 'ArrowDown' && opened) {
            event.preventDefault();
            dropdownRef.current?.querySelector<HTMLElement>('[data-menu-item]')?.focus();
        }
    };

    return (
        <Menu opened={opened} onChange={setOpened} position="bottom-start" offset={4} shadow="md" keepMounted>
            <Menu.Target>
                <UnstyledButton className={classes.link} onKeyDown={handleKeyDown}>
                    {label} <FontAwesomeIcon icon={faCaretDown} size="xs" />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown ref={dropdownRef}>{children}</Menu.Dropdown>
        </Menu>
    );
}

export function NavBrand(props: React.ComponentProps<typeof Link>) {
    return <Link {...props} className={classes.brand} />;
}

export function NavLink({ className, ...props }: React.ComponentProps<typeof Link>) {
    return <Link {...props} className={`${classes.link} ${className ?? ''}`} />;
}

export function NavExternalLink({ className, children, ...props }: React.ComponentProps<'a'>) {
    return (
        <a target="_blank" rel="noreferrer" {...props} className={`${classes.link} ${className ?? ''}`}>
            {children}
        </a>
    );
}
