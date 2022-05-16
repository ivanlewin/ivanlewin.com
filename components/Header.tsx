import { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../contexts/color-mode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styles from '../styles/Header.module.css';

const Header = () => {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();

    return (
        <header>
            <IconButton
                sx={{ ml: 1 }}
                className={styles.colorModeButton}
                onClick={colorMode.toggleColorMode}
                color='inherit'
                title='Toggle color mode'
            >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </header>
    );
};

export default Header;