export type Post = {
  content: string;
  title: string;
  date: string;
  author: string;
  image: string;
  excert: string;
  isFeatured: boolean;
  slug: string;
};

export type PostMarkdown = {
  title: string;
  date: string;
  author: string;
  image: string;
  excert: string;
  isFeatured: boolean;
};
