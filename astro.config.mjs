// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://tec.dotwall.co.uk",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  }
});