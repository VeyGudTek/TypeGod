import { defineConfig } from 'vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@Functions': path.resolve(__dirname, './src/Functions'),
      '@Models': path.resolve(__dirname, './src/Models'),
      '@Services': path.resolve(__dirname, './src/Services'),
      '@Static': path.resolve(__dirname, './src/Static'),
      '@Views': path.resolve(__dirname, './src/Views'),
    },
  }
})
