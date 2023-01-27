import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { getPostData } from '@/lib/posts-util';
import { FC } from 'react';

const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Getting started with Nextjs',
  image: 'getting-started-nextjs.png',
  date: '2022-02-10',
  content: '# This is a first post',
};

interface PostContentProps {
  post: ReturnType<typeof getPostData>;
}

const PostContent: FC<PostContentProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
