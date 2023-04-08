import { useTranslation } from 'react-i18next';

import { Grid, Typography, useTheme } from '@mui/material';

import Icon from './Home/Icon';
import UserSelectNone from './UserSelectNone';

const Footer = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <UserSelectNone>
            <Grid flexDirection='column' alignItems='center' color='primary.dark'
                sx={{
                    display: 'flex',
                    pb: '1.5rem',
                    borderTop: `1px solid ${theme.palette.primary.dark}`,
                    m: '0px auto',
                    maxWidth: '85%',
                    '& a': {
                        display: 'flex',
                    },
                    '& p': {
                        fontSize: '1em'
                    }
                }}
            >
                <Typography variant='body1' sx={{ m: '1rem' }}>
                    {t("Connect with me")}
                </Typography>
                <Grid justifyContent='space-evenly' sx={{
                    display: 'flex',
                    gap: theme.spacing(2.5),
                }}>
                    <a href='mailto:ivanlewin.trabajo@gmail.com' target='_blank' rel='noopener noreferrer'>
                        <Icon src='/pictures/Email.svg' title='Email' alt='Email icon' />
                    </a>
                    <a href='https://www.linkedin.com/in/ivanlewin' target='_blank' rel='noopener noreferrer'>
                        <Icon src='/pictures/LinkedIn.svg' title='LinkedIn' alt='LinkedIn Logo' />
                    </a>
                    <a href='https://www.github.com/ivanlewin' target='_blank' rel='noopener noreferrer'>
                        <Icon src='/pictures/GitHub.svg' title='GitHub' alt='GitHub Logo' />
                    </a>
                    <a href='https://leetcode.com/ivanlewin' target='_blank' rel='noopener noreferrer'>
                        <Icon src='/pictures/LeetCode.svg' title='LeetCode' alt='LeetCode Logo' />
                    </a>
                </Grid>
            </Grid>
        </UserSelectNone>
    );
};

export default Footer;