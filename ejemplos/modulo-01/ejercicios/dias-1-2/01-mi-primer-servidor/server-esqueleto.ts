#!/usr/bin/env node

/**
 * 🎯 EJERCICIO 1: Mi Primer Servidor MCP
 *
 * Tu misión: Completar la implementación de la herramienta "saludar"
 *
 * INSTRUCCIONES:
 * 1. Busca los comentarios // TODO en el código
 * 2. Implementa la funcionalidad requerida
 * 3. Prueba tu servidor con el cliente de testing
 *
 * NO MODIFIQUES las partes marcadas como "✅ COMPLETO"
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
} from '@modelcontextprotocol/sdk/types.js';

// ✅ COMPLETO: Configuración del servidor
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

// ✅ COMPLETO: Definición de herramientas disponibles
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
              description: 'El nombre de la persona a saludar'
            }
          },
          required: ['nombre']
        }
      }
    ]
  };
});

// ⚠️  TODO: Completar la implementación
server.setRequestHandler(CallToolRequestSchema, async (request): Promise<CallToolResult> => {
  const { name, arguments: args } = request.params;

  console.log(`🔧 Ejecutando herramienta: ${name}`);
  console.log(`📊 Parámetros:`, args);

  try {
    switch (name) {
      case 'saludar': {
        // TODO: Extraer el parámetro 'nombre' de args
        const nombre = // COMPLETAR AQUÍ

        // TODO: Validar que el nombre no esté vacío
        // Pista: Verificar que sea string y no esté vacío
        if (/* CONDICIÓN DE VALIDACIÓN */) {
          throw new Error('El nombre debe ser un texto no vacío');
        }

        // TODO: Crear el mensaje de saludo
        const mensaje = // CREAR MENSAJE PERSONALIZADO

        console.log(`👋 Saludando a: ${nombre}`);

        // TODO: Retornar la respuesta en formato MCP
        return {
          content: [
            {
              type: 'text',
              text: // MENSAJE DE SALUDO AQUÍ
            }
          ]
        };
      }

      default:
        throw new Error(`Herramienta desconocida: ${name}`);
    }

  } catch (error) {
    console.error(`❌ Error en ${name}:`, error.message);

    // TODO: Completar el manejo de errores
    return {
      content: [
        {
          type: 'text',
          text: // MENSAJE DE ERROR AQUÍ
        }
      ],
      isError: // BOOLEAN AQUÍ
    };
  }
});

// ✅ COMPLETO: Función principal e inicialización
async function main() {
  console.log('🚀 Iniciando Mi Primer Servidor MCP...');
  console.log('📚 Ejercicio 1 - Días 1-2');

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log('✅ Servidor iniciado');
  console.log('🔧 Herramienta disponible: saludar');
  console.log('📞 Esperando peticiones...\n');
}

// ✅ COMPLETO: Manejo de errores globales
process.on('unhandledRejection', (reason) => {
  console.error('❌ Promise rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// ✅ COMPLETO: Ejecutar servidor
main().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});
