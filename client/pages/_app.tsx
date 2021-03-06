import { useDarkMode } from '../lib/useDarkMode';
import { lightTheme, darkTheme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '../store/store';

function App({ Component, pageProps }: AppProps) {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  if (!componentMounted) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Community</title>
      </Head>

      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Component {...pageProps} onToggleTheme={toggleTheme} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);
