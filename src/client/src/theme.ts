import { createTheme, MantineColorsTuple } from '@mantine/core';

// Shades of the Franciscan brown (#964E02) used throughout the site; index 7 is the brand colour itself.
const brown: MantineColorsTuple = [
    '#fdf3e7',
    '#f5e3cf',
    '#e9c59e',
    '#dda669',
    '#d38b3d',
    '#cd7a20',
    '#b8660f',
    '#964e02',
    '#7a3f00',
    '#5f3000',
];

export const theme = createTheme({
    colors: { brown },
    primaryColor: 'brown',
    primaryShade: 7,
});
