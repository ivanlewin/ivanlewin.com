import { Box, useTheme } from "@mui/material";
import LanguageMenu from "../LanguageMenu";
import ColorModeMenu from "../ColorModeMenu";

const Header = () => {
  const theme = useTheme();
  return (
    <Box
      component={"header"}
      sx={{
        width: 1,
        padding: 1,
        display: "flex",
        justifyContent: "flex-end",
        "& > *:last-child": {
          marginRight: 2,
        },
        "& > *:not(:last-child)": {
          marginRight: 1,
        },
        [theme.breakpoints.down("sm")]: {},
      }}
    >
      <LanguageMenu />
      <ColorModeMenu />
    </Box>
  );
};

export default Header;
