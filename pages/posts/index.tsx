import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/lib/posts-util';
import { Post } from '@/types/post';
import Head from 'next/head';
import { FC } from 'react';

interface AllPostPageProps {
  posts: Post[];
}

const AllPostPage: FC<AllPostPageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>All my posts</title>
        <meta name="description" content="all my posts" />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostPage;
