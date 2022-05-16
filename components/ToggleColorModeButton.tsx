import { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../contexts/color-mode';
import styles from '../styles/ToggleColorModeButton.module.css';

const ToggleColorModeButton = () => {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    return (
        <IconButton
            sx={{ ml: 1 }}
            className={styles.colorModeButton}
            onClick={colorMode.toggleColorMode}
            color='inherit'
            title='Toggle color mode'
        >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default ToggleColorModeButton;