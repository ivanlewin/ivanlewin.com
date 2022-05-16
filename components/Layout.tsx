import { useTheme } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const theme = useTheme();
    const mainStyle = {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    }

    return (
        <main style={mainStyle}>
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default Layout;;