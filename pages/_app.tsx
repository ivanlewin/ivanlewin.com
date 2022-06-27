import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../ni18n.config';
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { mainTheme } from '../styles/theme';
import { ToggleColorMode } from '../contexts/color-mode';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useState } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const [colorMode, setColorMode] = useState<PaletteMode>('light');

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
