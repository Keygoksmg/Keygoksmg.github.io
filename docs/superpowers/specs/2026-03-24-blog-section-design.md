# Blog Section Design Spec

**Date:** 2026-03-24
**Status:** Approved

## Overview

Add a blog section to the academic portfolio site. Posts written in MDX, managed via Astro Content Collections (Content Layer API), accessible at `/blog` with individual post pages at `/blog/[slug]`.

## Decisions

| Question | Decision | Rationale |
|----------|----------|-----------|
| Content format | MDX | Flexibility to embed components in future; plain markdown works in MDX files too |
| Site structure | Separate section with nav | Clean separation between portfolio and blog |
| Post list layout | Simple list (date, title, excerpt) | Minimal, scannable, matches site aesthetic |
| Categorization | None for now | Not enough posts to warrant tags; easy to add later |

## Technical Design

### Dependencies

Install `@astrojs/mdx` and add it to `astro.config.mjs`:

```bash
npm install @astrojs/mdx
```

```js
// astro.config.mjs
import mdx from '@astrojs/mdx';
// add mdx() to integrations array
```

### Content Collection Schema

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog };
```

### File Structure

```
src/
  content/
    blog/
      my-first-post.mdx         ← blog posts (MDX files)
  content.config.ts              ← content collection schema
  pages/
    index.astro                  ← existing homepage (unchanged)
    blog/
      index.astro                ← post list page (/blog)
      [slug].astro               ← individual post page (/blog/[slug])
  components/
    Header.astro                 ← UPDATE existing: uncomment nav links, add Blog link
  layouts/
    Layout.astro                 ← UPDATE: move Global.css import here, add dynamic title, uncomment Header
```

### Key Implementation Details

#### 1. Move Global.css import from index.astro to Layout.astro

Currently `Global.css` is imported in `src/pages/index.astro`. This must move to `src/layouts/Layout.astro` so blog pages also receive global styles. Remove the import from `index.astro`.

#### 2. Dynamic `<title>` tag in Layout.astro

Layout.astro currently has `<title>Keigo Kusumegi</title>` hardcoded. Add a `title` prop:

```astro
---
interface Props {
  title?: string;
}
const { title } = Astro.props;
const pageTitle = title ? `${title} | Keigo Kusumegi` : 'Keigo Kusumegi';
---
<title>{pageTitle}</title>
```

Blog post pages pass the post title. Homepage passes nothing (keeps default).

#### 3. Reuse and update existing Header.astro

`Header.astro` already exists with the right structure (site name + nav). Update it:
- Uncomment the nav links
- Change links to: `Home` (`/`) and `Blog` (`/blog`)
- Keep existing styling

Then uncomment `<Header />` in Layout.astro (line 36).

#### 4. Astro 6 Content Layer: use `entry.id` for slugs

In Astro 6 Content Layer API, the glob loader derives `entry.id` from the filename (not `entry.slug` as in Astro 5). The `[slug].astro` page must use:

```astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
```

And render content via:

```astro
const { Content } = await post.render();
```

### Post Frontmatter

```yaml
---
title: "How I Use Claude Code"
description: "A walkthrough of my workflow for building and maintaining my academic site"
pubDate: 2026-03-24
---
```

### Pages

**`/blog` (index.astro)**
- Fetches all blog posts via `getCollection('blog')`
- Sorts by `pubDate` descending (newest first)
- Renders simple list: date + title + description
- Each item links to `/blog/[post.id]`

**`/blog/[slug]` ([slug].astro)**
- `getStaticPaths()` maps `post.id` to slug params
- Renders post title, formatted date, and MDX content
- Uses `Layout` with `title` prop for dynamic page title
- Prose typography styles for blog content

### Styling

- Matches existing design system (Global.css variables, fonts, colors)
- Blog list items: date in muted color (`--text-secondary`), title as link, description below
- Post content: proper spacing for paragraphs, styled code blocks, blockquotes, lists
- Hover states on list items consistent with existing site interactions

### Navigation

- Update existing `Header.astro` with Home | Blog nav links
- Uncomment `<Header />` in `Layout.astro`
- Header appears on all pages (homepage + blog)

## Explicit Non-Goals

- No tags or categories
- No search
- No RSS feed
- No pagination
- No comments
- No cover images
- No reading time estimates

These can all be added incrementally later without architectural changes.

## Sample Post

A placeholder post will be created to verify the implementation works end-to-end.
