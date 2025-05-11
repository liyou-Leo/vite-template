import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { execSync } from 'child_process';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      swcPlugins: [['@swc-jotai/react-refresh', {}]],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/components/Pages'),
      '@common': path.resolve(__dirname, './src/common'),
    },
  },
  define: {
    'import.meta.env.BUILD_TIME': JSON.stringify(new Date().toLocaleString()),
    'import.meta.env.GIT_BRANCH': JSON.stringify(execSync('git rev-parse --abbrev-ref HEAD').toString().trim())
  },
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
