import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from '../ni18n.config';
import { useEffect } from 'react';
import { useTheme } from '@mui/material';


const Home: NextPage = () => {

  const { t } = useTranslation();
  const theme = useTheme();
  const iconStyle = {
    style: {
      filter: `brightness(0) invert(${theme.palette.mode === 'dark' ? 1 : 0})`
    }
  };

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      window.scroll(0, window.innerHeight);
    }, 5000);

    window.addEventListener('scroll', () => {
      window.clearTimeout(timeoutID);
    });

  }, []);

  return (
    <Layout>
      <div className={styles.root}>
        <Head>
          <title>Iván Lewin</title>
          <meta name='description' content={t('Site description')} />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Iván Lewin</h1>
          <h2 className={styles.subtitle}>{`${t('Job title')}, Smart Safety`}</h2>
        </main>

        <footer className={styles.footer}>
          <p>{t('Connect with me')}</p>
          <div className={styles.iconContainer}>
            <a href='mailto:ivanlewin.trabajo@gmail.com' target='_blank' rel='noopener noreferrer'>
              <span className={styles.icon}>
                <Image src='/pictures/Email.svg' alt='Email icon' layout='fill' {...iconStyle} />
              </span>
            </a>
            <a href='https://www.github.com/ivanlewin' target='_blank' rel='noopener noreferrer'>
              <span className={styles.icon}>
                <Image src='/pictures/GitHub.svg' alt='GitHub Logo' layout='fill' {...iconStyle} />
              </span>
            </a>
            <a href='https://www.linkedin.com/in/ivanlewin' target='_blank' rel='noopener noreferrer'>
              <span className={styles.icon}>
                <Image src='/pictures/LinkedIn.png' alt='LinkedIn Logo' layout='fill' {...iconStyle} />
              </span>
            </a>
          </div>
        </footer>
      </div>
    </Layout>
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