import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/lib/posts-util';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const PostDetailPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excert} />
      </Head>
      <PostContent post={post} />;
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  post: ReturnType<typeof getPostData>;
}> = (context) => {
  const { params } = context;
  const { slug } = params as IParams;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const allPostFiles = getPostsFiles();

  const slugs = allPostFiles.map((fileName) => {
    return fileName.replace(/\.md/, '');
  });

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export default PostDetailPage;
