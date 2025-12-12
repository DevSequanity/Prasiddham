// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  // Update this to match your repository name
  // For user/organization pages: site: 'https://username.github.io'
  // For project pages: site: 'https://username.github.io/repository-name'
  site: 'https://shyamraval.github.io',
  base: '/Prasiddham', // Update this to match your repository name
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()],
  
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