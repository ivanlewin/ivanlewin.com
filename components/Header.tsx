import { Box } from '@mui/material';
import LanguageMenu from './LanguageMenu';
import ColorModeButton from './ColorModeButton';

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
        <ColorModeButton />
    </Box>
);

export default Header;