import { useState } from 'react';
import { createStyles, Navbar, UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';




const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        height: rem(4),
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: rem(10),
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
    },


    aside: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        display: 'flex',
        alignItems: 'center',
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        padding: rem(10),
    },


    mainLink: {
        width: rem(44),
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    mainLinkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },

}));

const mainLinksMockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
];

const linksMockdata = [
    'Security',
    'Settings',
    'Dashboard',
    'Releases',
    'Account',
    'Orders',
    'Clients',
    'Databases',
    'Pull Requests',
    'Open Issues',
    'Wiki pages',
];

export function DoubleNavbar({ children }) {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Releases');
    const [activeLink, setActiveLink] = useState('Settings');

    const mainLinks = mainLinksMockdata.map((link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
        >
            <UnstyledButton
                onClick={() => setActive(link.label)}
                className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active })}
            >
                <link.icon size="1.4rem" stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    ));

    const links = linksMockdata.map((link) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: activeLink === link })}
            href="/"
            onClick={(event) => {
                event.preventDefault();
                setActiveLink(link);
            }}
            key={link}
        >
            {link}
        </a>
    ));

    return (
        <Navbar height={50} display={`flex`} width={`100vw`}>
            <Navbar.Section grow className={classes.wrapper}>
                {mainLinks}
            </Navbar.Section>
        </Navbar>
    );
}