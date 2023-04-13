import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";
import vue from "@astrojs/vue";
import emoji from "remark-emoji";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), partytown({
    // Adds dataLayer.push as a forwarding-event.
    config: {
      forward: ["dataLayer.push"]
    }
  }), mdx()],
  markdown: {
    remarkPlugins: [emoji],
  },
  // this is for deploy to github pages
  site: 'https://keygoksmg.github.io',
  base: '/astro_test',
});