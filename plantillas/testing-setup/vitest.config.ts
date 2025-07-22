import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Configuración global de testing para el bootcamp MCP
    globals: true,
    environment: 'node',

    // Archivos de setup y configuración
    setupFiles: ['./src/test/setup.ts'],

    // Patrones de archivos de test
    include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules/**', 'dist/**', 'build/**'],

    // Configuración de cobertura
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },

    // Timeouts para tests de MCP
    testTimeout: 10000,
    hookTimeout: 10000,

    // Configuración de reporters
    reporter: ['verbose', 'json'],

    // Configuración específica para MCP servers
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        useAtomics: true,
      },
    },

    // Variables de entorno para tests
    env: {
      NODE_ENV: 'test',
      LOG_LEVEL: 'error',
    },
  },
});
