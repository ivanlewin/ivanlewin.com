import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { Typography } from '@mui/material';
import MenuButton from './Header/MenuButton';

const LanguageMenu = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const locale = (router.locale as 'en' | 'es') || 'en';

    const handleOnClick = (language: 'en' | 'es') => {
        handleClose();
        return router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale: language });
    };

    return (
        <>
            <MenuButton
                id='language-button'
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                title={t("Change language")}
                onClick={handleClick}
                label={t("Language")}
                icon={<LanguageIcon />}
                top={-2}
            />
            <Menu
                id='language-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                transformOrigin={{ vertical: 'center', horizontal: 'center', }}
                MenuListProps={{
                    'aria-labelledby': 'language-button',
                }}
                sx={{
                    fontSize: 14
                }}
            >
                <MenuItem
                    title={t("English")}
                    onClick={() => handleOnClick('en')}
                    selected={locale === 'en'}
                >
                    en
                </MenuItem>
                <MenuItem
                    title={t("Spanish")}
                    onClick={() => handleOnClick('es')}
                    selected={locale === 'es'}
                >
                    es
                </MenuItem>
            </Menu>
        </>
    );
};

export default LanguageMenu;
;
