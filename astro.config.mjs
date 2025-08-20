// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  integrations: [mdx()],
  site: 'https://iath-dev.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
});
