import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get() {
  return rss({
    title: 'Keigo Kusumegi',
    description: 'Keigo Kusumegi\'s personal web',
    site: 'https://my-blog-site.netlify.app',
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`,
  });
}