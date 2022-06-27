import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

type LayoutProps = {
    children?: React.ReactNode;
};

const excludedRoutes = ['/resume'];

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    if (excludedRoutes.includes(router.pathname)) {
        return <>{children}</>;
    } else {
        return (
            <Box
                component={'main'}
                sx={{
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                    height: '100%',
                    minHeight: '100vh',
                }}
            >
                <Header />
                {children}
                <Footer />
            </Box>
        );
    }
};

export default Layout;;