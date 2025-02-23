import '../globals.css';
import { Analytics } from '@vercel/analytics/react';
import cx from 'classnames';
import { sfPro, inter } from '../fonts';
import Nav from '@/components/layout/nav';
import Footer from '@/components/layout/footer';
import { Suspense } from 'react';
import { NextAuthProvider } from './providers';

export const metadata = {};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cx(sfPro.variable, inter.variable)}>
        <Suspense fallback='...'>
          <Nav />
        </Suspense>
        <main className='flex min-h-screen w-full flex-col items-center justify-center py-32'>
          <NextAuthProvider>{children}</NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
