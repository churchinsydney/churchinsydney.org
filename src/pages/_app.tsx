import { Flowbite } from 'flowbite-react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';

import '@/styles/globals.css';
import '@/styles/richText.css';

import { theme } from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', ${process.env.NEXT_PUBLIC_ANALYTICS_ID});
            `}
      </Script>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
        <CookiesProvider>
          <Flowbite theme={theme}>
            <Component {...pageProps} />
          </Flowbite>
        </CookiesProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
