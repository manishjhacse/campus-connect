import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Campus Connect',
        short_name: 'Campus Connect',
        description: 'All Your Campus Needs, in One Collaborative Space!',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon512_rounded.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon512_maskable.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      // workbox: {
      //   navigateFallback: '/offline.html', // Serve offline page when offline
      //   runtimeCaching: [
      //     {
      //       urlPattern: /.*/, // Cache all pages and assets
      //       handler: 'NetworkFirst',
      //       options: {
      //         cacheName: 'default-cache',
      //         expiration: {
      //           maxEntries: 50,
      //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      //         },
      //       },
      //     },
      //   ],
      // },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: '/offline.html',
      },
    }),
  ],
  server: {
    host: 'localhost',
    port: 5173,
  },
});