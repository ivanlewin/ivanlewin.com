import { Box, useTheme } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();

  return (
    <Box
      component={"main"}
      sx={{
        backgroundImage:
          theme.palette.mode === "dark"
            ? "url('/pictures/notes_black_big.png')"
            : "url('/pictures/notes_white_big.png')",
        color: "text.primary",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
