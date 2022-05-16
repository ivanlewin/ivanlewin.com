import { NextPage } from 'next';
import Link from 'next/link';
import { loadTranslations } from 'ni18n';
import { useTranslation } from 'react-i18next';
import { locales, ni18nConfig } from '../ni18n.config';
import styles from '../styles/404.module.css';

const Custom404: NextPage = () => {
  const { t } = useTranslation();

  return <div className={styles.root}>
    <h2 className={styles.message}>{t('Page not found')}</h2>
    <Link href='/'>
      <a className={styles.link}>
        {t('Go back to home page')}
      </a>
    </Link>
  </div>;
};

export default Custom404;

export const getStaticProps = async (props: { locale: locales; }) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
    },
  };
};