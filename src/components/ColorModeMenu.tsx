import { useState } from "react";
import { useTranslation } from "react-i18next";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import { IconButtonProps, Menu, MenuItem, Typography } from "@mui/material";

import { useColorMode } from "../contexts/color-mode";
import MenuButton from "./Header/MenuButton";

const ColorModeMenu = () => {
  const { t } = useTranslation();
  const { paletteMode, syncedWithSystem, changeColorMode } = useColorMode();

  const [menuAnchorEl, setMenuAnchor] = useState<null | HTMLButtonElement>(
    null
  );
  const open = Boolean(menuAnchorEl);
  const handleMenu: IconButtonProps["onClick"] = (event) =>
    setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  return (
    <>
      <MenuButton
        id="color-mode-button"
        aria-controls={open ? "color-mode-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        title={t("Change theme")}
        onClick={handleMenu}
        label={t("Theme")}
        icon={
          paletteMode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />
        }
      />
      <Menu
        id="color-mode-menu"
        anchorEl={menuAnchorEl}
        open={menuAnchorEl !== null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
        onClose={closeMenu}
        onClick={closeMenu}
        MenuListProps={{
          "aria-labelledby": "color-mode-button",
        }}
        sx={{
          fontSize: 14,
        }}
      >
        <MenuItem
          onClick={() => {
            changeColorMode("light");
          }}
          title={t("Light mode")}
          selected={!syncedWithSystem && paletteMode === "light"}
        >
          <Brightness7Icon />
          <Typography sx={{ ml: 2 }} variant="body1">
            {t("Light")}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeColorMode("dark");
          }}
          title={t("Dark mode")}
          selected={!syncedWithSystem && paletteMode === "dark"}
        >
          <Brightness4Icon />
          <Typography sx={{ ml: 2 }} variant="body1">
            {t("Dark")}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeColorMode("syncWithSystem");
          }}
          title={t("Sync with system")}
          selected={syncedWithSystem}
        >
          <BrightnessAutoIcon />
          <Typography sx={{ ml: 2 }} variant="body1">
            {t("Auto")}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColorModeMenu;
