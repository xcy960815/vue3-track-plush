import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'plugin/index.ts'),
      name: 'Vue3TrackPlush',
      formats: ['es', 'umd'],
      fileName: (format) => `vue3-track-plush.${format === 'es' ? 'esm' : 'umd'}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'vue',
        },
      },
    },
  },
});

