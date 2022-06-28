import { Button, ButtonProps, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

type MenuButtonProps = ButtonProps & {
    label: string;
    icon: ReactNode;
    top?: number;
};
const MenuButton = ({ label, icon, top, ...props }: MenuButtonProps) => {
    const theme = useTheme();

    return (
        <Button
            color='primary'
            sx={{ color: 'text.primary', textTransform: 'none', minWidth: 0 }}
            {...props}
        >
            {icon}
            <Typography variant='body1' fontSize={14}
                sx={{
                    ml: 1,
                    position: 'relative',
                    top: top,
                    [theme.breakpoints.down("sm")]: {
                        display: 'none',
                    }
                }}
            >
                {label}
            </Typography>
        </Button>
    );
};

export default MenuButton;