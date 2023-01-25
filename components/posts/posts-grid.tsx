import { Post } from '@/types/post';
import { FC } from 'react';
import classes from './posts-grid.module.css';
import PostsItem from './posts-item';

interface PostsGridProps {
  posts: Post[];
}

const PostsGrid: FC<PostsGridProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => {
        return <PostsItem post={post} key={post.title} />;
      })}
    </ul>
  );
};

export default PostsGrid;
