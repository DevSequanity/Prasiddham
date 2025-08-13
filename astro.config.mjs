// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()],
  adapter: vercel(),
  
  // Image optimization settings
  image: {
    // Enable image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Quality settings
    quality: 80,
    // Format settings
    format: ['webp', 'avif'],
    // Responsive image sizes
    densities: [1, 2],
    // Max width for responsive images
    maxWidth: 1920
  }
}); 