import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { PostMarkdown } from '@/types/post';

const postsRirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => {
  return fs.readdirSync(postsRirectory);
};

export const getPostData = (fileName: string) => {
  const postSlug = fileName.replace(/\.md/, '');
  const filePath = path.join(postsRirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const transformData: PostMarkdown = data as PostMarkdown;

  const postData = {
    slug: postSlug,
    ...transformData,
    content: content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPostsArray = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPostsArray;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};
