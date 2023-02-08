import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import UpdateAvailable from '../UpdateAvailable';

export default function Layout({ children }: { children: React.ReactNode }) {
  const isCiTest = process.env?.CI_TEST === 'true';
  return (
    <>
      <Header />
      <div id='skip-nav'>{children}</div>
      <Footer />
      {isCiTest && <UpdateAvailable className='absolute bottom-5 right-5' />}
    </>
  );
}
