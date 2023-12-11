import type { AppProps } from 'next/app';

import Head from 'next/head';
import { appWithI18Next } from 'ni18n';

import { CssBaseline, ThemeProvider } from '@mui/material';

import Layout from '../components/Layout';
import { ToggleColorMode } from '../contexts/color-mode';
import { ni18nConfig } from 'ni18n.config';
import { mainTheme } from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline enableColorScheme />
        <ToggleColorMode >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToggleColorMode >
      </ThemeProvider>
    </>
  );
};

export default appWithI18Next(App, ni18nConfig);
