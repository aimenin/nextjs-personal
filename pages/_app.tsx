import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Layout from '@/components/layout/layout';
import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />;
      </Layout>
    </Provider>
  );
}
