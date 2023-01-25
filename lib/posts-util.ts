import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { PostMarkdown } from '@/types/post';

const postsRirectory = path.join(process.cwd(), 'posts');

export const getPostData = (fileName: string) => {
  const filePath = path.join(postsRirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const transformData: PostMarkdown = data as PostMarkdown;

  const postSlug = fileName.replace(/\.md/, '');

  const postData = {
    slug: postSlug,
    ...transformData,
    content: content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = fs.readdirSync(postsRirectory);

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
