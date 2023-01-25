export type Post = {
  title: string;
  image: string;
  excerpt: string;
  date: string;
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
