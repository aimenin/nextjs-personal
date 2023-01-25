import { Post } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import classes from './posts-item.module.css';

interface PostItem {
  post: Post;
}

const PostsItem: FC<PostItem> = ({ post }) => {
  const { title, image, excerpt, date, slug } = post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link href="/">
        <div className={classes.image}>
          <Image src={imagePath} alt={title} width={300} height={200} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostsItem;
