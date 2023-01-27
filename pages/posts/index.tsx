import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/lib/posts-util';
import { Post } from '@/types/post';
import { FC } from 'react';

interface AllPostPageProps {
  posts: Post[];
}

const AllPostPage: FC<AllPostPageProps> = ({ posts }) => {
  return <AllPosts posts={posts} />;
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
