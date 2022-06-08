import { InferGetStaticPropsType } from 'next';

import { getAllFilesFrontmatter } from '@/lib/mdx';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

export default function AnnouncementsPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return Posts({ posts, tags, title: 'Announcements' });
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('blog');
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { props: { posts, tags } };
}
