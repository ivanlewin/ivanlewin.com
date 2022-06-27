import useLocalStorage from 'hooks/use-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { createTheme, PaletteMode, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';

import { getDesignTokens } from '../styles/theme';

type ColorModeContext = {
    paletteMode: PaletteMode;
    changeColorMode: (paletteMode: PaletteMode | 'syncWithSystem') => void;
};

export const ColorModeContext = createContext({
    paletteMode: 'dark',
    changeColorMode: () => { }
} as ColorModeContext);

type ToggleColorModeProps = {
    children?: React.ReactNode;
};

export const ToggleColorMode = ({ children }: ToggleColorModeProps) => {
    const theme = useTheme();

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [paletteMode, setPaletteMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

    const [userPreferences, setUserPreferences] = useLocalStorage('userPreferences', { paletteMode, syncWithSystem: true });

    useEffect(() => {
        if (userPreferences.syncWithSystem === false) {
            setPaletteMode(userPreferences.paletteMode);
        } else {
            setPaletteMode(prefersDarkMode ? 'dark' : 'light');
        }
    }, [prefersDarkMode, userPreferences]);

    const changeColorMode = useCallback((newMode: PaletteMode | 'syncWithSystem') => {
        if (newMode === 'syncWithSystem') {
            setPaletteMode(prefersDarkMode ? 'dark' : 'light');
            setUserPreferences({ paletteMode: prefersDarkMode ? 'dark' : 'light', syncWithSystem: true });
        } else {
            setPaletteMode(newMode);
            setUserPreferences({ paletteMode: newMode, syncWithSystem: false });
        }
    }, [prefersDarkMode, setUserPreferences]);

    const colorModeTheme = useMemo(() => (
        createTheme({
            ...theme,
            ...(getDesignTokens(paletteMode)),
        })
    ), [paletteMode, theme]);

    return (
        <ColorModeContext.Provider value={{ paletteMode, changeColorMode }}>
            <ThemeProvider theme={colorModeTheme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => useContext(ColorModeContext);