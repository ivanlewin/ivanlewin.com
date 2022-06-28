import { Grid } from "@mui/material";

type UserSelectNoneProps = { children: React.ReactNode; };
const UserSelectNone = ({ children }: UserSelectNoneProps) => {
    return (
        <Grid style={{ userSelect: 'none' }}>
            {children}
        </Grid>
    );
};

export default UserSelectNone;