import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/site.css', 'resources/js/site.js'],
            refresh: true,
        }),
        {
            // Fails the build when the minifier has rewritten :dir() into :lang() selectors.
            name: 'plinth-keep-dir',
            generateBundle(_, bundle) {
                for (const file of Object.values(bundle)) {
                    if (
                        file.fileName.endsWith('.css') &&
                        String(file.source).includes(':lang(ae)')
                    ) {
                        this.error(
                            `${file.fileName}: :dir(rtl) was rewritten; check build.cssTarget`,
                        );
                    }
                }
            },
        },
    ],
    // Vite's default CSS target predates :dir(), so its minifier rewrites :dir(rtl) into a list of
    // :lang() selectors and nothing flips under a bare dir="rtl" (#151). This is the oldest
    // target that keeps it.
    build: {
        cssTarget: ['chrome120', 'edge120', 'firefox114', 'safari16.4', 'ios16.4'],
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
