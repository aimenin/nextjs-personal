import FeaturedPosts from '@/components/home-page/featured-posts';
import Hero from '@/components/home-page/hero';
import { getFeaturedPosts } from '@/lib/posts-util';
import { Post } from '@/types/post';
import Head from 'next/head';
import { FC } from 'react';

export const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting started with Nextjs',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next js is very good tool',
    date: '2022-02-10',
  },
  {
    slug: 'getting-started-with-nextjs2',
    title: 'Getting started with Nextjs',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next js is very good tool',
    date: '2022-02-10',
  },
  {
    slug: 'getting-started-with-nextjs2',
    title: 'Getting started with Nextjs',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next js is very good tool',
    date: '2022-02-10',
  },
  {
    slug: 'getting-started-with-nextjs3',
    title: 'Getting started with Nextjs',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next js is very good tool',
    date: '2022-02-10',
  },
];

interface HomeProps {
  posts: Post[];
}

const Home: FC<HomeProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Aimenin personal site</title>
        <meta name="description" content="Personal webstite of aimenin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export default Home;

export const getStaticProps = () => {
  const featuredProps = getFeaturedPosts();

  return {
    props: {
      posts: featuredProps,
    },
    revalidate: 60,
  };
};
