import { createContext, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import { colorModePalette } from '../styles/theme';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

type ToggleColorModeProps = {
    children?: React.ReactNode;
};

export const ToggleColorMode = ({ children }: ToggleColorModeProps) => {
    const theme = useTheme();

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

    // when system settings change, update site color mode
    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    const providerValue = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const colorModeTheme = useMemo(() => (
        createTheme({
            ...theme,
            palette: colorModePalette(mode),
        })
    ), [mode, theme]);

    return (
        <ColorModeContext.Provider value={providerValue}>
            <ThemeProvider theme={colorModeTheme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};