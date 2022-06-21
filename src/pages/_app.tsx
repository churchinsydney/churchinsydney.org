import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';

import 'react-tippy/dist/tippy.css';
import '@/styles/globals.css';
import '@/styles/mdx.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
