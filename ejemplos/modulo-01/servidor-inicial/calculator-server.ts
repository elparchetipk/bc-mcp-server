import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * Servidor MCP de Calculadora - Bootcamp MCP Server
 *
 * Este es el primer ejemplo práctico del bootcamp que implementa
 * un servidor MCP completo con herramientas matemáticas básicas.
 *
 * Características:
 * - Herramientas matemáticas fundamentales
 * - Validación robusta de parámetros
 * - Manejo de errores profesional
 * - Logging para debugging
 * - Compatibilidad con web simulator
 */

class CalculatorMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'calculator-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupEventHandlers();
    this.logInfo('Servidor MCP Calculadora inicializado');
  }

  /**
   * Configurar manejadores de eventos del servidor MCP
   */
  setupEventHandlers() {
    // Listar herramientas disponibles
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      this.logInfo('Solicitando lista de herramientas');
      return {
        tools: [
          {
            name: 'add',
            description: 'Suma dos números',
            inputSchema: {
              type: 'object',
              properties: {
                a: {
                  type: 'number',
                  description: 'Primer número a sumar',
                },
                b: {
                  type: 'number',
                  description: 'Segundo número a sumar',
                },
              },
              required: ['a', 'b'],
            },
          },
          {
            name: 'subtract',
            description: 'Resta dos números',
            inputSchema: {
              type: 'object',
              properties: {
                a: {
                  type: 'number',
                  description: 'Minuendo (número del cual se resta)',
                },
                b: {
                  type: 'number',
                  description: 'Sustraendo (número que se resta)',
                },
              },
              required: ['a', 'b'],
            },
          },
          {
            name: 'multiply',
            description: 'Multiplica dos números',
            inputSchema: {
              type: 'object',
              properties: {
                a: {
                  type: 'number',
                  description: 'Primer factor',
                },
                b: {
                  type: 'number',
                  description: 'Segundo factor',
                },
              },
              required: ['a', 'b'],
            },
          },
          {
            name: 'divide',
            description: 'Divide dos números',
            inputSchema: {
              type: 'object',
              properties: {
                a: {
                  type: 'number',
                  description: 'Dividendo (número que se divide)',
                },
                b: {
                  type: 'number',
                  description: 'Divisor (número por el cual se divide)',
                },
              },
              required: ['a', 'b'],
            },
          },
          {
            name: 'power',
            description: 'Eleva un número a una potencia',
            inputSchema: {
              type: 'object',
              properties: {
                base: {
                  type: 'number',
                  description: 'Número base',
                },
                exponent: {
                  type: 'number',
                  description: 'Exponente',
                },
              },
              required: ['base', 'exponent'],
            },
          },
          {
            name: 'sqrt',
            description: 'Calcula la raíz cuadrada de un número',
            inputSchema: {
              type: 'object',
              properties: {
                value: {
                  type: 'number',
                  description: 'Número del cual calcular la raíz cuadrada',
                  minimum: 0,
                },
              },
              required: ['value'],
            },
          },
          {
            name: 'percentage',
            description: 'Calcula un porcentaje de un valor',
            inputSchema: {
              type: 'object',
              properties: {
                value: {
                  type: 'number',
                  description: 'Valor base',
                },
                percentage: {
                  type: 'number',
                  description: 'Porcentaje a calcular',
                },
              },
              required: ['value', 'percentage'],
            },
          },
          {
            name: 'factorial',
            description: 'Calcula el factorial de un número entero',
            inputSchema: {
              type: 'object',
              properties: {
                n: {
                  type: 'integer',
                  description: 'Número entero positivo',
                  minimum: 0,
                  maximum: 20,
                },
              },
              required: ['n'],
            },
          },
        ],
      };
    });

    // Ejecutar herramientas
    this.server.setRequestHandler(CallToolRequestSchema, async request => {
      const { name, arguments: args } = request.params;

      this.logInfo(`Ejecutando herramienta: ${name}`, args);

      try {
        const result = await this.executeTool(name, args || {});
        this.logInfo(`Herramienta ${name} ejecutada exitosamente`, result);

        return {
          content: [
            {
              type: 'text',
              text: result.explanation,
            },
          ],
        };
      } catch (error) {
        this.logError(`Error ejecutando herramienta ${name}:`, error);

        return {
          content: [
            {
              type: 'text',
              text: `❌ Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  /**
   * Ejecutar una herramienta específica
   */
  async executeTool(toolName, args) {
    switch (toolName) {
      case 'add':
        return this.add(args.a, args.b);

      case 'subtract':
        return this.subtract(args.a, args.b);

      case 'multiply':
        return this.multiply(args.a, args.b);

      case 'divide':
        return this.divide(args.a, args.b);

      case 'power':
        return this.power(args.base, args.exponent);

      case 'sqrt':
        return this.sqrt(args.value);

      case 'percentage':
        return this.percentage(args.value, args.percentage);

      case 'factorial':
        return this.factorial(args.n);

      default:
        throw new Error(`Herramienta desconocida: ${toolName}`);
    }
  }

  /**
   * Operaciones matemáticas
   */

  add(a, b) {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');

    const result = a + b;
    return {
      operation: 'add',
      operands: [a, b],
      result: result,
      explanation: `✅ Suma: ${a} + ${b} = ${result}`,
    };
  }

  subtract(a, b) {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');

    const result = a - b;
    return {
      operation: 'subtract',
      operands: [a, b],
      result: result,
      explanation: `✅ Resta: ${a} - ${b} = ${result}`,
    };
  }

  multiply(a, b) {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');

    const result = a * b;
    return {
      operation: 'multiply',
      operands: [a, b],
      result: result,
      explanation: `✅ Multiplicación: ${a} × ${b} = ${result}`,
    };
  }

  divide(a, b) {
    this.validateNumber(a, 'a');
    this.validateNumber(b, 'b');

    if (b === 0) {
      throw new Error('División por cero no permitida');
    }

    const result = a / b;
    return {
      operation: 'divide',
      operands: [a, b],
      result: Number.isInteger(result)
        ? result
        : parseFloat(result.toFixed(10)),
      explanation: `✅ División: ${a} ÷ ${b} = ${result}`,
    };
  }

  power(base, exponent) {
    this.validateNumber(base, 'base');
    this.validateNumber(exponent, 'exponent');

    if (base === 0 && exponent < 0) {
      throw new Error('No se puede elevar 0 a una potencia negativa');
    }

    const result = Math.pow(base, exponent);

    if (!Number.isFinite(result)) {
      throw new Error('El resultado es demasiado grande o indefinido');
    }

    return {
      operation: 'power',
      operands: [base, exponent],
      result: Number.isInteger(result)
        ? result
        : parseFloat(result.toFixed(10)),
      explanation: `✅ Potencia: ${base}^${exponent} = ${result}`,
    };
  }

  sqrt(value) {
    this.validateNumber(value, 'value');

    if (value < 0) {
      throw new Error(
        'No se puede calcular la raíz cuadrada de un número negativo'
      );
    }

    const result = Math.sqrt(value);
    return {
      operation: 'sqrt',
      operands: [value],
      result: Number.isInteger(result)
        ? result
        : parseFloat(result.toFixed(10)),
      explanation: `✅ Raíz cuadrada: √${value} = ${result}`,
    };
  }

  percentage(value, percentage) {
    this.validateNumber(value, 'value');
    this.validateNumber(percentage, 'percentage');

    const result = (value * percentage) / 100;
    return {
      operation: 'percentage',
      operands: [value, percentage],
      result: Number.isInteger(result)
        ? result
        : parseFloat(result.toFixed(10)),
      explanation: `✅ Porcentaje: ${percentage}% de ${value} = ${result}`,
    };
  }

  factorial(n) {
    if (!Number.isInteger(n)) {
      throw new Error(
        'El factorial solo se puede calcular para números enteros'
      );
    }

    if (n < 0) {
      throw new Error('El factorial no está definido para números negativos');
    }

    if (n > 20) {
      throw new Error('Factorial demasiado grande (máximo: 20)');
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }

    return {
      operation: 'factorial',
      operands: [n],
      result: result,
      explanation: `✅ Factorial: ${n}! = ${result}`,
    };
  }

  /**
   * Utilidades de validación
   */

  validateNumber(value, paramName) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new Error(`El parámetro '${paramName}' debe ser un número válido`);
    }
  }

  /**
   * Utilidades de logging
   */

  logInfo(message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`);
    if (data) {
      console.log('Data:', JSON.stringify(data, null, 2));
    }
  }

  logError(message, error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`);
    if (error) {
      console.error('Error details:', error);
    }
  }

  /**
   * Iniciar el servidor
   */
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    this.logInfo('Servidor MCP Calculadora iniciado y conectado');
  }
}

// Ejecutar servidor si es el archivo principal
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new CalculatorMCPServer();

  // Manejar señales de terminación graceful
  process.on('SIGINT', async () => {
    console.log('\\n🛑 Cerrando servidor MCP Calculadora...');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\\n🛑 Cerrando servidor MCP Calculadora...');
    process.exit(0);
  });

  // Manejar errores no capturados
  process.on('uncaughtException', error => {
    console.error('❌ Error no capturado:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
    process.exit(1);
  });

  // Iniciar servidor
  server.start().catch(error => {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  });
}

export { CalculatorMCPServer };
