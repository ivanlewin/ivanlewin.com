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
        ].join(',')
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