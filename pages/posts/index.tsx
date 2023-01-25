import AllPosts from '@/components/posts/all-posts';
import { DUMMY_POSTS } from '..';

const AllPostPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostPage;
