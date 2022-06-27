import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

export const mainTheme = createTheme({
    typography: {
        fontFamily: [
            // 'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Oxygen',
            'Ubuntu',
            'Cantarell',
            'Fira Sans',
            'Droid Sans',
            'Helvetica Neue',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '3rem'
        },
        h2: {
            fontSize: '1.5rem'
        },
        h3: {
            fontSize: '1.25rem'
        },
        body1: {
            fontSize: '1rem'
        }
    },
});

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        background: {
            ...(mode === 'dark' && {
                default: '#1a1a1a',
            }),
            ...(mode === 'light' && {
                default: '#ffffff',
            }),
        },
    },
});