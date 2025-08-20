// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

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
  // NOTA: Eliminamos el adaptador de node y la configuración de build
  // ya que GitHub Pages necesita archivos estáticos, no un servidor Node.js
});
