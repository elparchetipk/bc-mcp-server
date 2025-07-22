#!/usr/bin/env node

/**
 * Servidor MCP de Calculadora Básica - Días 1-2
 * Bootcamp MCP Server - De Zero a Hero
 *
 * Este es tu PRIMER servidor MCP. Está diseñado para ser simple y educativo.
 * Cada línea está comentada para que entiendas qué hace y por qué.
 *
 * 🎯 Objetivo: Entender los conceptos fundamentales de MCP
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * PASO 1: Crear el servidor MCP
 *
 * Aquí definimos la "identidad" de nuestro servidor:
 * - name: Como se identifica nuestro servidor
 * - version: Para control de versiones
 * - capabilities: Qué funcionalidades ofrece
 */
const server = new Server(
  {
    name: 'calculadora-basica-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      // Le decimos a MCP que tenemos herramientas disponibles
      tools: {},
    },
  }
);

/**
 * PASO 2: Definir qué herramientas tenemos disponibles
 *
 * Cuando Claude pregunta "¿qué puedes hacer?", respondemos con esta lista.
 * Es como el menú de un restaurante: muestra todas las opciones disponibles.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.log('📋 Cliente solicita lista de herramientas disponibles');

  return {
    tools: [
      {
        name: 'sumar',
        description: 'Suma dos números y retorna el resultado',
        inputSchema: {
          type: 'object',
          properties: {
            a: {
              type: 'number',
              description: 'Primer número para la suma',
            },
            b: {
              type: 'number',
              description: 'Segundo número para la suma',
            },
          },
          required: ['a', 'b'],
        },
      },
      {
        name: 'restar',
        description: 'Resta el segundo número del primero',
        inputSchema: {
          type: 'object',
          properties: {
            a: {
              type: 'number',
              description: 'Número del cual restar',
            },
            b: {
              type: 'number',
              description: 'Número a restar',
            },
          },
          required: ['a', 'b'],
        },
      },
      {
        name: 'multiplicar',
        description: 'Multiplica dos números',
        inputSchema: {
          type: 'object',
          properties: {
            a: {
              type: 'number',
              description: 'Primer número',
            },
            b: {
              type: 'number',
              description: 'Segundo número',
            },
          },
          required: ['a', 'b'],
        },
      },
      {
        name: 'dividir',
        description: 'Divide el primer número entre el segundo',
        inputSchema: {
          type: 'object',
          properties: {
            a: {
              type: 'number',
              description: 'Número a dividir (dividendo)',
            },
            b: {
              type: 'number',
              description: 'Número por el cual dividir (divisor)',
            },
          },
          required: ['a', 'b'],
        },
      },
    ],
  };
});

/**
 * PASO 3: Manejar las llamadas a herramientas
 *
 * Cuando Claude dice "usa la herramienta X con estos parámetros",
 * esta función se ejecuta. Es el "cerebro" de nuestro servidor.
 */
server.setRequestHandler(
  CallToolRequestSchema,
  async (request): Promise<CallToolResult> => {
    const { name, arguments: args } = request.params;

    console.log(`🔧 Ejecutando herramienta: ${name}`);
    console.log(`📊 Parámetros recibidos:`, args);

    try {
      // Verificamos qué herramienta nos están pidiendo
      switch (name) {
        case 'sumar': {
          // Validamos que tengamos los números necesarios
          const { a, b } = args as { a: number; b: number };

          if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Los parámetros a y b deben ser números');
          }

          const resultado = a + b;
          console.log(`➕ Suma: ${a} + ${b} = ${resultado}`);

          return {
            content: [
              {
                type: 'text',
                text:
                  `La suma de ${a} + ${b} es igual a ${resultado}.\n\n` +
                  `Explicación paso a paso:\n` +
                  `• Primer número: ${a}\n` +
                  `• Segundo número: ${b}\n` +
                  `• Operación: suma (+)\n` +
                  `• Resultado: ${resultado}`,
              },
            ],
          };
        }

        case 'restar': {
          const { a, b } = args as { a: number; b: number };

          if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Los parámetros a y b deben ser números');
          }

          const resultado = a - b;
          console.log(`➖ Resta: ${a} - ${b} = ${resultado}`);

          return {
            content: [
              {
                type: 'text',
                text:
                  `La resta de ${a} - ${b} es igual a ${resultado}.\n\n` +
                  `Explicación paso a paso:\n` +
                  `• Minuendo: ${a}\n` +
                  `• Sustraendo: ${b}\n` +
                  `• Operación: resta (-)\n` +
                  `• Resultado: ${resultado}`,
              },
            ],
          };
        }

        case 'multiplicar': {
          const { a, b } = args as { a: number; b: number };

          if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Los parámetros a y b deben ser números');
          }

          const resultado = a * b;
          console.log(`✖️ Multiplicación: ${a} × ${b} = ${resultado}`);

          return {
            content: [
              {
                type: 'text',
                text:
                  `La multiplicación de ${a} × ${b} es igual a ${resultado}.\n\n` +
                  `Explicación paso a paso:\n` +
                  `• Primer factor: ${a}\n` +
                  `• Segundo factor: ${b}\n` +
                  `• Operación: multiplicación (×)\n` +
                  `• Resultado: ${resultado}`,
              },
            ],
          };
        }

        case 'dividir': {
          const { a, b } = args as { a: number; b: number };

          if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Los parámetros a y b deben ser números');
          }

          // ¡Importante! Verificamos división por cero
          if (b === 0) {
            throw new Error(
              'No se puede dividir por cero. El divisor (b) debe ser diferente de 0.'
            );
          }

          const resultado = a / b;
          console.log(`➗ División: ${a} ÷ ${b} = ${resultado}`);

          return {
            content: [
              {
                type: 'text',
                text:
                  `La división de ${a} ÷ ${b} es igual a ${resultado}.\n\n` +
                  `Explicación paso a paso:\n` +
                  `• Dividendo: ${a}\n` +
                  `• Divisor: ${b}\n` +
                  `• Operación: división (÷)\n` +
                  `• Resultado: ${resultado}`,
              },
            ],
          };
        }

        default:
          throw new Error(`Herramienta desconocida: ${name}`);
      }
    } catch (error) {
      console.error(`❌ Error ejecutando ${name}:`, error);

      return {
        content: [
          {
            type: 'text',
            text:
              `Error al ejecutar la herramienta '${name}': ${error.message}\n\n` +
              `Consejos para solucionarlo:\n` +
              `• Verifica que los números sean válidos\n` +
              `• No dividas por cero\n` +
              `• Asegúrate de usar números, no texto`,
          },
        ],
        isError: true,
      };
    }
  }
);

/**
 * PASO 4: Iniciar el servidor
 *
 * Esta parte "enciende" nuestro servidor y lo prepara para recibir peticiones.
 * Es como abrir la puerta de la tienda para que entren los clientes.
 */
async function main() {
  console.log('🚀 Iniciando Calculadora Básica MCP Server...');
  console.log('📚 Módulo 1 - Días 1-2: Fundamentos MCP');

  // Creamos el transport (la "conexión" con Claude)
  const transport = new StdioServerTransport();

  // Conectamos el servidor con el transport
  await server.connect(transport);

  console.log('✅ Servidor iniciado correctamente');
  console.log(
    '🔧 Herramientas disponibles: sumar, restar, multiplicar, dividir'
  );
  console.log('📞 Listo para recibir peticiones de Claude...\n');
}

/**
 * PASO 5: Manejo de errores globales
 *
 * Si algo sale muy mal, estos manejadores nos ayudan a entender qué pasó
 * y evitan que el servidor se "cuelgue".
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Error no manejado en Promise:', promise, 'razón:', reason);
});

process.on('uncaughtException', error => {
  console.error('❌ Excepción no capturada:', error);
  process.exit(1);
});

// ¡Ejecutar el servidor!
main().catch(error => {
  console.error('💥 Error fatal al iniciar el servidor:', error);
  process.exit(1);
});
