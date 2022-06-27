import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';

const LanguageMenu = () => {
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
        <div>
            <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ textTransform: 'none', color: 'text.primary' }}
            >
                {locale}
            </Button>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                transformOrigin={{ vertical: 'center', horizontal: 'center', }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleOnClick('en')}>en</MenuItem>
                <MenuItem onClick={() => handleOnClick('es')}>es</MenuItem>
            </Menu>
        </div>
    );
};

export default LanguageMenu;
;
