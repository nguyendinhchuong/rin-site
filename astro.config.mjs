// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import astroI18next from 'astro-i18next';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://vinhson.com.vn',
  output: 'server', // Server mode with selective prerendering for static pages
  adapter: vercel({
    isr: {
      // Cache pages for 1 hour (3600 seconds)
      // Pages are regenerated in the background when accessed after expiration
      expiration: 3600,
    },
  }),
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'vi',
        locales: {
          vi: 'vi-VN',
          en: 'en-US',
        },
      },
    }),
    astroI18next(),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['cae612e5aa0b.ngrok-free.app', 'localhost', '127.0.0.1'],
    },
  },
});