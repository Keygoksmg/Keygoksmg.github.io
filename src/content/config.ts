// // 1. `astro:content` からユーティリティをインポート。
// // ここで **`astro:content` が見つからん** って怒られる人は本記事の一番下参照
// import { defineCollection } from 'astro:content';
// import { blogSchema, newsletterSchema } from '../schemas';
// // import { blogSchema } from 'my-blog-theme'; // サードパーティ製でも 🙆🏻‍♂️

// // 2. 検証したいコレクションごとにスキーマを定義する。
// const blogCollection = defineCollection({ schema: blogSchema });
// const newsletterCollection = defineCollection({ schema: newsletterSchema });

// // 3. コレクションを登録するために `collections` オブジェクトをエクスポート。
// // `key` が 1. で作った `<コレクション名>` に対応している。
// export const collections = {
//   // blog: defineCollection({ /* ... */ }), // 直接書いても 🙆🏻‍♂️
//   blog: blogCollection,
//   newsletter: newsletterCollection,
// };