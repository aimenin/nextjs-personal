import Hero from '@/components/home-page/hero';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Aimenin personal site</title>
        <meta name="description" content="Personal webstite of aimenin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
}
