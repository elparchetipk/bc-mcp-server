#!/usr/bin/env node

/**
 * 🎯 Plantilla Base para Servidor MCP Personalizado
 *
 * Esta plantilla te proporciona la estructura básica para crear
 * tu propio servidor MCP. Personalízala según tu proyecto.
 *
 * INSTRUCCIONES:
 * 1. Cambia el nombre y descripción del servidor
 * 2. Implementa tus herramientas en la sección correspondiente
 * 3. Agrega validaciones específicas para tu dominio
 * 4. Personaliza mensajes y logging
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * CONFIGURACIÓN DEL SERVIDOR
 *
 * Personaliza estos valores según tu proyecto:
 */
const SERVER_CONFIG = {
  name: 'mi-servidor-mcp-personalizado', // 🔧 CAMBIAR: Nombre de tu servidor
  version: '1.0.0',
  description: 'Servidor MCP para [describe tu caso de uso]', // 🔧 CAMBIAR: Descripción
};

/**
 * CLASE PRINCIPAL DEL SERVIDOR
 *
 * Organizar el código en una clase hace que sea más fácil de mantener
 * y permite agregar estado y métodos auxiliares.
 */
class MiServidorMCPPersonalizado {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: SERVER_CONFIG.name,
        version: SERVER_CONFIG.version,
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupEventHandlers();
    this.logInfo(`${SERVER_CONFIG.name} inicializado`);
  }

  /**
   * CONFIGURAR MANEJADORES DE EVENTOS
   */
  private setupEventHandlers(): void {
    // Listar herramientas disponibles
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      this.logInfo('Cliente solicita lista de herramientas');

      return {
        tools: [
          // 🔧 PERSONALIZAR: Agrega tus herramientas aquí
          {
            name: 'ejemplo-herramienta',
            description: 'Herramienta de ejemplo - reemplázala con la tuya',
            inputSchema: {
              type: 'object',
              properties: {
                texto: {
                  type: 'string',
                  description: 'Texto de ejemplo',
                },
              },
              required: ['texto'],
            },
          },

          // 🔧 AGREGAR: Más herramientas aquí...
          // {
          //   name: 'mi-herramienta-2',
          //   description: 'Descripción de mi segunda herramienta',
          //   inputSchema: { /* esquema */ }
          // }
        ],
      };
    });

    // Ejecutar herramientas
    this.server.setRequestHandler(CallToolRequestSchema, async request => {
      return this.handleToolCall(request);
    });
  }

  /**
   * MANEJAR LLAMADAS A HERRAMIENTAS
   *
   * Este método distribuye las peticiones a la herramienta correspondiente.
   */
  private async handleToolCall(request: any): Promise<CallToolResult> {
    const { name, arguments: args } = request.params;

    this.logInfo(`Ejecutando herramienta: ${name}`);
    this.logInfo(`Parámetros: ${JSON.stringify(args, null, 2)}`);

    try {
      switch (name) {
        case 'ejemplo-herramienta':
          return await this.herramientaEjemplo(args);

        // 🔧 AGREGAR: Casos para tus herramientas
        // case 'mi-herramienta-2':
        //   return await this.miHerramienta2(args);

        default:
          throw new Error(`Herramienta desconocida: ${name}`);
      }
    } catch (error: any) {
      this.logError(`Error en herramienta ${name}:`, error);
      return this.createErrorResponse(error.message);
    }
  }

  /**
   * 🔧 IMPLEMENTAR: HERRAMIENTA DE EJEMPLO
   *
   * Reemplaza esta herramienta con la tuya propia.
   */
  private async herramientaEjemplo(args: any): Promise<CallToolResult> {
    // Validar parámetros
    const { texto } = args;
    if (!texto || typeof texto !== 'string') {
      throw new Error('El parámetro "texto" es requerido y debe ser un string');
    }

    // Lógica de tu herramienta aquí
    const resultado = `¡Hola! Recibí el texto: "${texto}"`;

    this.logInfo(`Herramienta ejemplo ejecutada exitosamente`);

    return {
      content: [
        {
          type: 'text',
          text: resultado,
        },
      ],
    };
  }

  /**
   * 🔧 AGREGAR: IMPLEMENTA TUS HERRAMIENTAS AQUÍ
   *
   * Ejemplo de estructura para una nueva herramienta:

  private async miHerramienta2(args: any): Promise<CallToolResult> {
    // 1. Validar parámetros
    const { parametro1, parametro2 } = args;
    if (!parametro1) {
      throw new Error('parametro1 es requerido');
    }

    // 2. Lógica de negocio
    const resultado = // tu lógica aquí

    // 3. Logging
    this.logInfo(`Mi herramienta 2 ejecutada con éxito`);

    // 4. Retornar resultado
    return {
      content: [
        {
          type: 'text',
          text: resultado
        }
      ]
    };
  }
  */

  /**
   * UTILIDADES DE LOGGING Y MANEJO DE ERRORES
   */
  private logInfo(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 📋 INFO: ${message}`);
  }

  private logError(message: string, error?: any): void {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ❌ ERROR: ${message}`);
    if (error) {
      console.error(error);
    }
  }

  private createErrorResponse(message: string): CallToolResult {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${message}\n\n💡 Revisa los parámetros y vuelve a intentar.`,
        },
      ],
      isError: true,
    };
  }

  /**
   * INICIAR EL SERVIDOR
   */
  public async run(): Promise<void> {
    this.logInfo(`Iniciando ${SERVER_CONFIG.name}...`);
    this.logInfo(`Versión: ${SERVER_CONFIG.version}`);
    this.logInfo(`Descripción: ${SERVER_CONFIG.description}`);

    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    this.logInfo('✅ Servidor iniciado correctamente');
    this.logInfo('📞 Esperando peticiones...\n');
  }
}

/**
 * INICIALIZACIÓN Y MANEJO DE ERRORES GLOBALES
 */
async function main(): Promise<void> {
  const servidor = new MiServidorMCPPersonalizado();
  await servidor.run();
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejection no manejada:', promise, 'razón:', reason);
});

process.on('uncaughtException', error => {
  console.error('❌ Excepción no capturada:', error);
  process.exit(1);
});

// 🚀 ¡INICIAR SERVIDOR!
main().catch(error => {
  console.error('💥 Error fatal al iniciar:', error);
  process.exit(1);
});
