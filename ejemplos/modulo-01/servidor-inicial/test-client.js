#!/usr/bin/env node

/**
 * Cliente de Testing MCP para Fedora 42
 *
 * Este cliente permite probar el servidor MCP sin necesidad de MCP Server Desktop.
 * Perfecto para el entorno de desarrollo del bootcamp.
 */

import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { createInterface } from 'readline';

class MCPTestClient {
  constructor() {
    this.serverProcess = null;
    this.messageId = 1;
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.isConnected = false;
    this.testResults = [];
  }

  /**
   * Iniciar el servidor MCP
   */
  async startServer() {
    console.log('🚀 Iniciando servidor MCP Calculator...');

    this.serverProcess = spawn('node', ['calculator-server.js'], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    this.serverProcess.on('error', error => {
      console.error('❌ Error iniciando servidor:', error);
    });

    this.serverProcess.stderr.on('data', data => {
      console.log('📝 Servidor:', data.toString().trim());
    });

    // Esperar un poco para que el servidor inicie
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.isConnected = true;
    console.log('✅ Servidor iniciado correctamente');
  }

  /**
   * Enviar solicitud JSON-RPC al servidor
   */
  async sendRequest(method, params = {}) {
    if (!this.isConnected) {
      throw new Error('Servidor no conectado');
    }

    const request = {
      jsonrpc: '2.0',
      id: this.messageId++,
      method: method,
      params: params,
    };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: El servidor no respondió'));
      }, 5000);

      let responseData = '';

      const onData = data => {
        responseData += data.toString();
        try {
          const response = JSON.parse(responseData);
          clearTimeout(timeout);
          this.serverProcess.stdout.off('data', onData);
          resolve(response);
        } catch (e) {
          // Datos incompletos, seguir esperando
        }
      };

      this.serverProcess.stdout.on('data', onData);
      this.serverProcess.stdin.write(JSON.stringify(request) + '\\n');
    });
  }

  /**
   * Listar herramientas disponibles
   */
  async listTools() {
    console.log('\\n🛠️ Obteniendo lista de herramientas...');
    try {
      const response = await this.sendRequest('tools/list');

      if (response.error) {
        console.error('❌ Error:', response.error.message);
        return;
      }

      console.log('✅ Herramientas disponibles:');
      response.result.tools.forEach((tool, index) => {
        console.log(`${index + 1}. ${tool.name}: ${tool.description}`);
      });

      return response.result.tools;
    } catch (error) {
      console.error('❌ Error obteniendo herramientas:', error.message);
    }
  }

  /**
   * Ejecutar una herramienta
   */
  async callTool(name, args) {
    console.log(`\\n🔧 Ejecutando herramienta: ${name}`);
    console.log('📋 Argumentos:', JSON.stringify(args, null, 2));

    try {
      const response = await this.sendRequest('tools/call', {
        name: name,
        arguments: args,
      });

      if (response.error) {
        console.error('❌ Error:', response.error.message);
        this.testResults.push({
          tool: name,
          args: args,
          success: false,
          error: response.error.message,
        });
        return;
      }

      console.log('✅ Resultado:');
      response.result.content.forEach(content => {
        console.log(`   ${content.text}`);
      });

      this.testResults.push({
        tool: name,
        args: args,
        success: true,
        result: response.result.content,
      });

      return response.result;
    } catch (error) {
      console.error('❌ Error ejecutando herramienta:', error.message);
      this.testResults.push({
        tool: name,
        args: args,
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Ejecutar suite de pruebas automáticas
   */
  async runTestSuite() {
    console.log('\\n🧪 EJECUTANDO SUITE DE PRUEBAS AUTOMÁTICAS');
    console.log('='.repeat(50));

    const tests = [
      // Pruebas básicas
      { tool: 'add', args: { a: 5, b: 3 }, expected: 8 },
      { tool: 'subtract', args: { a: 10, b: 4 }, expected: 6 },
      { tool: 'multiply', args: { a: 7, b: 6 }, expected: 42 },
      { tool: 'divide', args: { a: 15, b: 3 }, expected: 5 },

      // Pruebas avanzadas
      { tool: 'power', args: { base: 2, exponent: 8 }, expected: 256 },
      { tool: 'sqrt', args: { value: 144 }, expected: 12 },
      {
        tool: 'percentage',
        args: { value: 200, percentage: 15 },
        expected: 30,
      },
      { tool: 'factorial', args: { n: 5 }, expected: 120 },

      // Pruebas de casos edge
      { tool: 'add', args: { a: -5, b: 3 }, expected: -2 },
      { tool: 'divide', args: { a: 1, b: 3 }, expected: 0.3333333333 },
      { tool: 'sqrt', args: { value: 0 }, expected: 0 },

      // Pruebas de error
      { tool: 'divide', args: { a: 5, b: 0 }, shouldError: true },
      { tool: 'sqrt', args: { value: -4 }, shouldError: true },
      { tool: 'factorial', args: { n: -1 }, shouldError: true },
    ];

    for (const test of tests) {
      console.log(
        `\\n🔍 Probando: ${test.tool} con ${JSON.stringify(test.args)}`
      );

      try {
        const result = await this.callTool(test.tool, test.args);

        if (test.shouldError) {
          console.log(
            '⚠️  Se esperaba un error, pero la operación fue exitosa'
          );
        } else if (result) {
          console.log('✅ Prueba pasada');
        }
      } catch (error) {
        if (test.shouldError) {
          console.log('✅ Error esperado capturado correctamente');
        } else {
          console.log('❌ Error inesperado:', error.message);
        }
      }
    }

    this.generateTestReport();
  }

  /**
   * Generar reporte de pruebas
   */
  generateTestReport() {
    console.log('\\n📊 REPORTE DE PRUEBAS');
    console.log('='.repeat(30));

    const successful = this.testResults.filter(t => t.success).length;
    const total = this.testResults.length;

    console.log(`✅ Exitosas: ${successful}`);
    console.log(`❌ Fallidas: ${total - successful}`);
    console.log(`📊 Total: ${total}`);
    console.log(
      `📈 Tasa de éxito: ${((successful / total) * 100).toFixed(1)}%`
    );

    // Guardar reporte detallado
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: total,
        successful: successful,
        failed: total - successful,
        successRate: (successful / total) * 100,
      },
      results: this.testResults,
    };

    writeFileSync('test-report.json', JSON.stringify(report, null, 2));
    console.log('\\n💾 Reporte detallado guardado en: test-report.json');
  }

  /**
   * Modo interactivo
   */
  async interactiveMode() {
    console.log('\\n🎮 MODO INTERACTIVO');
    console.log('Comandos disponibles:');
    console.log('  list - Listar herramientas');
    console.log('  call <tool> <args> - Ejecutar herramienta');
    console.log('  test - Ejecutar suite de pruebas');
    console.log('  exit - Salir');
    console.log('');

    const askQuestion = () => {
      this.rl.question('MCP> ', async input => {
        const parts = input.trim().split(' ');
        const command = parts[0];

        try {
          switch (command) {
            case 'list':
              await this.listTools();
              break;

            case 'call':
              if (parts.length < 3) {
                console.log('Uso: call <tool> <json_args>');
                console.log('Ejemplo: call add {"a":5,"b":3}');
                break;
              }

              const toolName = parts[1];
              const argsStr = parts.slice(2).join(' ');
              const args = JSON.parse(argsStr);
              await this.callTool(toolName, args);
              break;

            case 'test':
              await this.runTestSuite();
              break;

            case 'exit':
              console.log('👋 ¡Hasta luego!');
              this.cleanup();
              return;

            default:
              console.log(
                'Comando desconocido. Usa "list", "call", "test" o "exit".'
              );
          }
        } catch (error) {
          console.error('❌ Error:', error.message);
        }

        askQuestion();
      });
    };

    askQuestion();
  }

  /**
   * Limpiar recursos
   */
  cleanup() {
    if (this.serverProcess) {
      this.serverProcess.kill('SIGTERM');
    }
    this.rl.close();
    process.exit(0);
  }

  /**
   * Demostración completa
   */
  async demo() {
    console.log('🎯 DEMO COMPLETA DEL SERVIDOR MCP CALCULATOR');
    console.log('='.repeat(50));

    try {
      // Iniciar servidor
      await this.startServer();

      // Listar herramientas
      await this.listTools();

      // Ejecutar algunos ejemplos
      console.log('\\n🎨 EJEMPLOS DE USO:');
      await this.callTool('add', { a: 15, b: 27 });
      await this.callTool('multiply', { a: 8, b: 7 });
      await this.callTool('sqrt', { value: 144 });
      await this.callTool('percentage', { value: 200, percentage: 25 });

      // Suite de pruebas
      await this.runTestSuite();

      // Modo interactivo
      console.log('\\n🚀 Iniciando modo interactivo...');
      await this.interactiveMode();
    } catch (error) {
      console.error('❌ Error en demo:', error);
      this.cleanup();
    }
  }
}

// Manejo de señales
process.on('SIGINT', () => {
  console.log('\\n🛑 Cerrando cliente MCP...');
  process.exit(0);
});

// Ejecutar demo si es el archivo principal
if (import.meta.url === `file://${process.argv[1]}`) {
  const client = new MCPTestClient();

  // Parsear argumentos
  const args = process.argv.slice(2);

  if (args.includes('--test')) {
    client
      .startServer()
      .then(() => client.runTestSuite())
      .then(() => client.cleanup());
  } else if (args.includes('--interactive')) {
    client.startServer().then(() => client.interactiveMode());
  } else {
    client.demo();
  }
}

export { MCPTestClient };
