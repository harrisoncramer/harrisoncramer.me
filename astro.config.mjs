import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.masamicooks.com',
  integrations: [tailwind(), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), react()]
});