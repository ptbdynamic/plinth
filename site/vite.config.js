import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/site.css', 'resources/js/site.js'],
            refresh: true,
        }),
    ],
    // Vite's default CSS target predates :dir(), so its minifier rewrites :dir(rtl) into a list of
    // :lang() selectors and nothing flips under a bare dir="rtl" (#151). Plinth's own target
    // (Baseline newly available) keeps it.
    build: {
        cssTarget: ['chrome120', 'edge120', 'firefox114', 'safari16.4', 'ios16.4'],
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
