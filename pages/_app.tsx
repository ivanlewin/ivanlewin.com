import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../ni18n.config';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from '../styles/theme';
import { ToggleColorMode } from '../contexts/color-mode';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <ToggleColorMode >
        <Component {...pageProps} />
      </ToggleColorMode >
    </ThemeProvider>
  );
};

export default appWithI18Next(App, ni18nConfig);
