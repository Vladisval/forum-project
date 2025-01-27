/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Это нужно для использования тестов без импорта
    environment: 'jsdom', // Это важно для тестов, использующих DOM
  },
});