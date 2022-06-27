import { Box } from '@mui/material';
import LanguageMenu from './LanguageMenu';
import ToggleColorModeButton from './ToggleColorModeButton';

const Header = () => (
    <Box
        component={'header'}
        sx={{
            width: 1,
            padding: 1,
            display: 'flex',
            justifyContent: 'flex-end',
        }}
    >
        <LanguageMenu />
        <ToggleColorModeButton />
    </Box>
);

export default Header;