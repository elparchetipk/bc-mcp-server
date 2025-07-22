/**
 * Setup global para tests del bootcamp MCP
 *
 * Este archivo se ejecuta antes de todos los tests y configura
 * el entorno de testing específico para servidores MCP.
 */

import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

// Configuración global antes de todos los tests
beforeAll(async () => {
  // Configurar timeouts para operaciones MCP
  process.env.NODE_ENV = 'test';
  process.env.LOG_LEVEL = 'error';

  // Configurar timezone para tests consistentes
  process.env.TZ = 'UTC';

  console.log('🧪 Configurando entorno de testing MCP...');
});

// Limpieza después de todos los tests
afterAll(async () => {
  console.log('🧹 Limpiando entorno de testing...');
});

// Setup antes de cada test individual
beforeEach(async () => {
  // Limpiar cualquier estado global entre tests
  // Esto es especialmente importante para servidores MCP
  // que pueden mantener estado interno
});

// Limpieza después de cada test individual
afterEach(async () => {
  // Asegurar que no queden procesos colgando
  // Importante para tests de servidores que usan stdio
});

// Utilidades globales para testing MCP
declare global {
  var mcpTestUtils: {
    createMockTransport: () => any;
    createTestServer: (config?: any) => any;
    waitForServerReady: (server: any, timeout?: number) => Promise<void>;
  };
}

// Implementación de utilidades de testing
globalThis.mcpTestUtils = {
  createMockTransport: () => {
    return {
      start: vi.fn(),
      close: vi.fn(),
      send: vi.fn(),
      onmessage: null,
      onerror: null,
      onclose: null,
    };
  },

  createTestServer: (config = {}) => {
    // Mock básico de servidor MCP para testing
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      setRequestHandler: vi.fn(),
      ...config,
    };
  },

  waitForServerReady: async (server: any, timeout = 5000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (server.isReady && server.isReady()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Servidor no estuvo listo en ${timeout}ms`);
  },
};

// Configurar mocks globales que todos los tests pueden necesitar
vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
  access: vi.fn(),
  mkdir: vi.fn(),
}));

// Mock de console para tests más limpios (opcional)
// global.console = {
//   ...console,
//   log: vi.fn(),
//   error: vi.fn(),
//   warn: vi.fn(),
//   info: vi.fn()
// };
