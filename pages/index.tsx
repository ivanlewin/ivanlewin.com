import type { NextPage } from 'next';
import UserSelectNone from 'components/UserSelectNone';
import Head from 'next/head';
import { loadTranslations } from 'ni18n';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { locales, ni18nConfig } from '../ni18n.config';

const Home: NextPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      window.scroll(0, window.innerHeight);
    }, 5000);

    window.addEventListener('scroll', () => {
      window.clearTimeout(timeoutID);
    });
  }, []);

  return (
    <UserSelectNone >
      <Head>
        <title>Iván Lewin</title>
        <meta name='description' content={t('Site description')} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Grid container flexDirection='column' justifyContent='center' alignItems='center' component='main'
        sx={{
          height: '100vh'
        }}
      >
        <Typography variant='h1'
          sx={{
            mt: '-56px',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          Iván Lewin
        </Typography>

        <Typography color='primary.dark' variant='body1'
          sx={{
            m: 0,
            textAlign: 'center',
          }}
        >
          {t('Job description')}
        </Typography>
      </Grid>
    </UserSelectNone >
  );
};

export default Home;

export const getStaticProps = async (props: { locale: locales; }) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
    },
  };
};