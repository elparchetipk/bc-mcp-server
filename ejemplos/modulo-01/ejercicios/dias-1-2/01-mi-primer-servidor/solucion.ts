#!/usr/bin/env node

/**
 * 🎯 SOLUCIÓN: Mi Primer Servidor MCP
 *
 * Esta es la solución completa del ejercicio 1.
 * Compárala con tu implementación una vez que termines.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'mi-primer-servidor-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.log('📋 Cliente solicita lista de herramientas');

  return {
    tools: [
      {
        name: 'saludar',
        description: 'Saluda a una persona con su nombre',
        inputSchema: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'El nombre de la persona a saludar',
            },
          },
          required: ['nombre'],
        },
      },
    ],
  };
});

server.setRequestHandler(
  CallToolRequestSchema,
  async (request): Promise<CallToolResult> => {
    const { name, arguments: args } = request.params;

    console.log(`🔧 Ejecutando herramienta: ${name}`);
    console.log(`📊 Parámetros:`, args);

    try {
      switch (name) {
        case 'saludar': {
          // SOLUCIÓN: Extraer el parámetro nombre
          const { nombre } = args as { nombre: string };

          // SOLUCIÓN: Validar que el nombre sea válido
          if (
            !nombre ||
            typeof nombre !== 'string' ||
            nombre.trim().length === 0
          ) {
            throw new Error('El nombre debe ser un texto no vacío');
          }

          // SOLUCIÓN: Limpiar el nombre (quitar espacios)
          const nombreLimpio = nombre.trim();

          // SOLUCIÓN: Crear mensaje personalizado
          const mensaje = `¡Hola ${nombreLimpio}! Bienvenido/a al mundo MCP.
¡Es genial conocerte!`;

          console.log(`👋 Saludando a: ${nombreLimpio}`);

          // SOLUCIÓN: Retornar respuesta correcta
          return {
            content: [
              {
                type: 'text',
                text: mensaje,
              },
            ],
          };
        }

        default:
          throw new Error(`Herramienta desconocida: ${name}`);
      }
    } catch (error) {
      console.error(`❌ Error en ${name}:`, error.message);

      // SOLUCIÓN: Manejo completo de errores
      return {
        content: [
          {
            type: 'text',
            text:
              `Error al procesar la solicitud: ${error.message}\n\n` +
              `💡 Consejos:\n` +
              `• Asegúrate de proporcionar un nombre válido\n` +
              `• El nombre debe ser texto, no números\n` +
              `• No uses nombres vacíos`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  console.log('🚀 Iniciando Mi Primer Servidor MCP...');
  console.log('📚 Ejercicio 1 - Días 1-2 (SOLUCIÓN)');

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log('✅ Servidor iniciado');
  console.log('🔧 Herramienta disponible: saludar');
  console.log('📞 Esperando peticiones...\n');
}

process.on('unhandledRejection', reason => {
  console.error('❌ Promise rejection:', reason);
});

process.on('uncaughtException', error => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

main().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});
