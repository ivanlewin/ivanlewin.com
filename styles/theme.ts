import { createTheme, ThemeOptions } from '@mui/material';

export const mainTheme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
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
            fontSize: '1.25rem'
        }
    }
});

export const colorModePalette = (mode: 'light' | 'dark'): ThemeOptions['palette'] => ({
    mode,
    ...(mode === 'light' ? {
        // light mode palette
        background: {
            default: '#ffffff',
        }
    } : {
        // dark mode palette
        background: {
            default: '#1a1a1a',
        }
    })
});