import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://sendanemail.xyz',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envPrefix: ['PUBLIC_', 'VITE_'],
    server: {
      proxy: {
        '/api': 'http://localhost:8000',
      },
    },
  },
})
