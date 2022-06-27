import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import { Button, IconButtonProps, Menu, MenuItem, Typography } from '@mui/material';

import { useColorMode } from '../contexts/color-mode';

const ColorModeButton = () => {
    const { t } = useTranslation();
    const { paletteMode, syncedWithSystem, changeColorMode } = useColorMode();

    const [menuAnchorEl, setMenuAnchor] = useState<null | HTMLButtonElement>(null);
    const handleMenu: IconButtonProps['onClick'] = (event) => setMenuAnchor(event.currentTarget);
    const closeMenu = () => setMenuAnchor(null);;

    return (
        <>
            <Button
                color='primary'
                sx={{
                    ml: 1,
                    mr: 2,
                    color: 'text.primary',
                    textTransform: 'none',
                }}
                title={t('Change color mode')}
                onClick={handleMenu}
            >
                {paletteMode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
                <Typography sx={{ ml: 1 }} variant='body1'>{t('Theme')}</Typography>
            </Button>
            <Menu
                anchorEl={menuAnchorEl}
                open={menuAnchorEl !== null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                transformOrigin={{ vertical: 'center', horizontal: 'center', }}
                onClose={closeMenu}
                onClick={closeMenu}
            >
                <MenuItem
                    onClick={() => { changeColorMode('light'); }}
                    title={t('Light mode')}
                    selected={!syncedWithSystem && paletteMode === 'light'}
                >
                    <Brightness7Icon />
                    <Typography sx={{ ml: 2 }} variant='body1'>{t('Light')}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => { changeColorMode('dark'); }}
                    title={t('Dark mode')}
                    selected={!syncedWithSystem && paletteMode === 'dark'}
                >
                    <Brightness4Icon />
                    <Typography sx={{ ml: 2 }} variant='body1'>{t('Dark')}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => { changeColorMode('syncWithSystem'); }}
                    title='Sincronizar con el sistema'
                    selected={syncedWithSystem}
                >
                    <BrightnessAutoIcon />
                    <Typography sx={{ ml: 2 }} variant='body1'>{t('Auto')}</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ColorModeButton;