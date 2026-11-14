// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://bhupha-p.com',
  // Vue components only ship JavaScript where a page asks for it (client:*).
  integrations: [vue()],
});
