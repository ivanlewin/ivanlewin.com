import UserSelectNone from 'components/UserSelectNone';
import { NextPage } from 'next';
import Link from 'next/link';
import { loadTranslations } from 'ni18n';
import { useTranslation } from 'react-i18next';

import { Grid, Typography, useTheme } from '@mui/material';

import { locales, ni18nConfig } from 'ni18n.config';

const Custom404: NextPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <UserSelectNone >
      <Grid flexDirection='column' alignItems='center' justifyContent='center'
        sx={{
          display: 'flex',
          height: '100vh',
        }}
      >
        <Typography
          variant='h2'
          color='primary.main'
          sx={{
            fontSize: '1.2rem',
          }}
        >{t("Page not found")}</Typography>
        <Link href='/'>
          <a >
            <Typography
              variant='body1'
              color='primary.dark'
              sx={{
                textDecoration: 'underline',
                '&:visited': {
                  textDecorationColor: theme.palette.primary.main,
                },
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              {t("Go back to home page")}
            </Typography>
          </a>
        </Link>
      </Grid>
    </UserSelectNone>
  );
};

export default Custom404;

export const getStaticProps = async (props: { locale: locales; }) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
    },
  };
};