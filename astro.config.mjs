// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    // github pages
    site: 'https://keygoksmg.github.io/',
    // base: '/keygoksmg.github.io',

    // integration settings
    integrations: [
      icon(),
      mdx(),
      partytown({ config: { forward: ["dataLayer.push"] } })
    ],

    // to prevent from getting hot reload stoping after importing third-party scripts 
    vite: {
      server: {
        watch: {
          usePolling: true,
        },
      },
    },
  });