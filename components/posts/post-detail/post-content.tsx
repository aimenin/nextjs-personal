import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { FC } from 'react';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { getPostData } from '@/lib/posts-util';
import { NormalComponents } from 'react-markdown/lib/complex-types';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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

  const customRenderers: Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
  > = {
    img(image) {
      return (
        <Image
          src={image.src || ''}
          alt={image.alt || 'markdown image'}
          width={600}
          height={300}
        />
      );
    },
    code(code) {
      const { className, children } = code;
      let language = '';
      if (className) {
        language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      }
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {children as string}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
