import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Yash Kumar Portfolio',
                short_name: 'Yash Kumar',
                theme_color: '#050816',
                background_color: '#050816',
                display: 'standalone',
                icons: [
                    { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
                ]
            }
        })
    ]
});
