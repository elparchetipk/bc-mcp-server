#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * Servidor MCP básico creado con la plantilla del bootcamp
 *
 * Este servidor demuestra los conceptos fundamentales de MCP:
 * - Configuración básica del servidor
 * - Definición de herramientas (tools)
 * - Manejo de requests y responses
 * - Mejores prácticas de estructura de código
 */

// Crear instancia del servidor MCP
const server = new Server(
  {
    name: 'mcp-server-template',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Handler para listar las herramientas disponibles
 * Este endpoint es llamado por los clientes MCP para descubrir
 * qué herramientas proporciona nuestro servidor
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'echo',
        description: 'Devuelve el texto que se le proporciona como entrada',
        inputSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'El texto a devolver',
            },
          },
          required: ['text'],
        },
      },
      {
        name: 'get_current_time',
        description: 'Obtiene la fecha y hora actual',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

/**
 * Handler para ejecutar herramientas
 * Este endpoint maneja la ejecución de las herramientas
 * cuando son invocadas por un cliente MCP
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'echo': {
        const text = args?.text as string;
        if (!text) {
          throw new Error('Se requiere el parámetro "text"');
        }

        return {
          content: [
            {
              type: 'text',
              text: `Echo: ${text}`,
            },
          ],
        };
      }

      case 'get_current_time': {
        const now = new Date();
        return {
          content: [
            {
              type: 'text',
              text: `Fecha y hora actual: ${now.toLocaleString('es-ES', {
                timeZone: 'Europe/Madrid',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Herramienta desconocida: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    return {
      content: [
        {
          type: 'text',
          text: `Error ejecutando ${name}: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Función principal para iniciar el servidor
 */
async function main(): Promise<void> {
  const transport = new StdioServerTransport();

  console.error('🚀 Iniciando servidor MCP template...');
  console.error('📋 Herramientas disponibles: echo, get_current_time');

  await server.connect(transport);

  console.error('✅ Servidor MCP conectado y listo');
}

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Error no capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rechazada no manejada:', reason);
  console.error('En:', promise);
  process.exit(1);
});

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.error('👋 Cerrando servidor MCP...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('👋 Cerrando servidor MCP...');
  process.exit(0);
});

// Iniciar el servidor
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  });
}
