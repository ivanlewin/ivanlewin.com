import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

export const mainTheme = createTheme({
    typography: {
        fontSize: 16,
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
            fontSize: 32,
            fontWeight: '600'
        },
        h2: {
            fontSize: 16,
            fontWeight: '400'
        },
        h3: {
            fontSize: 20
        },
        body1: {
            fontSize: 16
        }
    },
});

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        background: {
            ...(mode === 'dark' ? ({
                default: '#1a1a1a',
            }) : ({
                default: '#ffffff',
            })),
        },
        text: {
            ...(mode === 'dark' ? ({
            }) : ({
            })),
        },
        primary: {
            ...(mode === 'dark' ? ({
                main: '#eaeaea',
                dark: '#bdbdbd',
            }) : ({
                main: '#1a1a1a',
            })),
        }
    },
});