import * as vscode from 'vscode';
import { MCPServerManager } from './mcp/serverManager';
import { ChatSimulatorPanel } from './panels/chatSimulatorPanel';
import { BootcampExamplesProvider } from './providers/bootcampExamplesProvider';
import { LogsTreeProvider } from './providers/logsTreeProvider';
import { ServersTreeProvider } from './providers/serversTreeProvider';
import { ToolsTreeProvider } from './providers/toolsTreeProvider';

/**
 * MCP Bootcamp Studio Extension
 *
 * Extensión VS Code que simula la experiencia de MCP Server Desktop
 * específicamente diseñada para el bootcamp MCP Server - De Zero a Hero.
 *
 * Características principales:
 * - Gestión visual de servidores MCP
 * - Testing interactivo de herramientas
 * - Simulador de chat estilo Claude Desktop
 * - Logs educativos del protocolo MCP
 * - Integración con ejemplos del bootcamp
 */

export function activate(context: vscode.ExtensionContext) {
  console.log('🚀 MCP Bootcamp Studio está iniciándose...');

  // Inicializar servicios principales
  const serverManager = new MCPServerManager();

  // Inicializar proveedores de datos
  const serversProvider = new ServersTreeProvider(serverManager);
  const toolsProvider = new ToolsTreeProvider(serverManager);
  const logsProvider = new LogsTreeProvider(serverManager);
  const examplesProvider = new BootcampExamplesProvider();

  // Registrar tree views
  const serversTreeView = vscode.window.createTreeView('mcpServers', {
    treeDataProvider: serversProvider,
    showCollapseAll: true,
    canSelectMany: false,
  });

  const toolsTreeView = vscode.window.createTreeView('mcpTools', {
    treeDataProvider: toolsProvider,
    showCollapseAll: false,
    canSelectMany: false,
  });

  const logsTreeView = vscode.window.createTreeView('mcpLogs', {
    treeDataProvider: logsProvider,
    showCollapseAll: true,
    canSelectMany: false,
  });

  // Contexto para comandos condicionales
  vscode.commands.executeCommand(
    'setContext',
    'mcpBootcamp.hasActiveServer',
    false
  );

  // Registrar comandos principales

  // Gestión de servidores
  const addServerCommand = vscode.commands.registerCommand(
    'mcpBootcamp.addServer',
    async () => {
      await showAddServerDialog(serverManager, serversProvider);
    }
  );

  const connectServerCommand = vscode.commands.registerCommand(
    'mcpBootcamp.connectServer',
    async serverItem => {
      await connectToServer(
        serverManager,
        serverItem,
        serversProvider,
        toolsProvider
      );
    }
  );

  const disconnectServerCommand = vscode.commands.registerCommand(
    'mcpBootcamp.disconnectServer',
    async serverItem => {
      await disconnectFromServer(
        serverManager,
        serverItem,
        serversProvider,
        toolsProvider
      );
    }
  );

  const refreshServersCommand = vscode.commands.registerCommand(
    'mcpBootcamp.refreshServers',
    () => {
      serversProvider.refresh();
      vscode.window.showInformationMessage('🔄 Servidores MCP refrescados');
    }
  );

  // Testing de herramientas
  const callToolCommand = vscode.commands.registerCommand(
    'mcpBootcamp.callTool',
    async toolItem => {
      await executeToolInteractively(serverManager, toolItem);
    }
  );

  const inspectToolCommand = vscode.commands.registerCommand(
    'mcpBootcamp.inspectTool',
    async toolItem => {
      await showToolInspector(toolItem);
    }
  );

  // Gestión de logs
  const clearLogsCommand = vscode.commands.registerCommand(
    'mcpBootcamp.clearLogs',
    () => {
      serverManager.clearLogs();
      logsProvider.refresh();
      vscode.window.showInformationMessage(
        '🧹 Logs del protocolo MCP limpiados'
      );
    }
  );

  const exportLogsCommand = vscode.commands.registerCommand(
    'mcpBootcamp.exportLogs',
    async () => {
      await exportProtocolLogs(serverManager);
    }
  );

  // Funcionalidades educativas del bootcamp
  const openDocsCommand = vscode.commands.registerCommand(
    'mcpBootcamp.openBootcampDocs',
    () => {
      const docsUri = vscode.Uri.parse(
        'https://github.com/tu-usuario/bc-mcp-server/tree/main/docs'
      );
      vscode.env.openExternal(docsUri);
    }
  );

  const runExampleCommand = vscode.commands.registerCommand(
    'mcpBootcamp.runBootcampExample',
    async () => {
      await showBootcampExamples(examplesProvider);
    }
  );

  // Chat Simulator (se inicializa bajo demanda)
  let chatPanel: ChatSimulatorPanel | undefined;

  const openChatCommand = vscode.commands.registerCommand(
    'mcpBootcamp.openChatSimulator',
    () => {
      if (!chatPanel) {
        chatPanel = new ChatSimulatorPanel(context.extensionUri, serverManager);
      }
      chatPanel.show();
    }
  );

  // Listeners para actualizar estado de la extensión
  serverManager.onServerConnected((serverId: string) => {
    vscode.commands.executeCommand(
      'setContext',
      'mcpBootcamp.hasActiveServer',
      true
    );
    serversProvider.refresh();
    toolsProvider.refresh();

    vscode.window.showInformationMessage(
      `✅ Conectado al servidor MCP: ${serverId}`
    );
  });

  serverManager.onServerDisconnected((serverId: string) => {
    const hasActiveServers = serverManager.getActiveServers().length > 0;
    vscode.commands.executeCommand(
      'setContext',
      'mcpBootcamp.hasActiveServer',
      hasActiveServers
    );

    serversProvider.refresh();
    toolsProvider.refresh();

    vscode.window.showInformationMessage(
      `❌ Desconectado del servidor MCP: ${serverId}`
    );
  });

  serverManager.onProtocolMessage((message: any) => {
    logsProvider.addLogEntry(message);
  });

  // Auto-detectar y cargar proyectos del bootcamp
  if (vscode.workspace.workspaceFolders) {
    autoDetectBootcampProjects(serverManager, examplesProvider);
  }

  // Registrar todos los comandos y proveedores en el contexto
  context.subscriptions.push(
    serversTreeView,
    toolsTreeView,
    logsTreeView,
    addServerCommand,
    connectServerCommand,
    disconnectServerCommand,
    refreshServersCommand,
    callToolCommand,
    inspectToolCommand,
    clearLogsCommand,
    exportLogsCommand,
    openDocsCommand,
    runExampleCommand,
    openChatCommand
  );

  console.log('✅ MCP Bootcamp Studio activado correctamente');

  // Mostrar mensaje de bienvenida
  vscode.window
    .showInformationMessage(
      '🎉 ¡MCP Bootcamp Studio está listo! Comienza agregando un servidor MCP.',
      'Agregar Servidor',
      'Ver Ejemplos',
      'Documentación'
    )
    .then(selection => {
      switch (selection) {
        case 'Agregar Servidor':
          vscode.commands.executeCommand('mcpBootcamp.addServer');
          break;
        case 'Ver Ejemplos':
          vscode.commands.executeCommand('mcpBootcamp.runBootcampExample');
          break;
        case 'Documentación':
          vscode.commands.executeCommand('mcpBootcamp.openBootcampDocs');
          break;
      }
    });
}

export function deactivate() {
  console.log('👋 MCP Bootcamp Studio desactivándose...');
}

// Funciones auxiliares (implementación completa en archivos separados)

async function showAddServerDialog(
  serverManager: MCPServerManager,
  serversProvider: ServersTreeProvider
) {
  // Implementación del diálogo para agregar servidor
  // Se mostrará en serverManager.ts
}

async function connectToServer(
  serverManager: MCPServerManager,
  serverItem: any,
  serversProvider: ServersTreeProvider,
  toolsProvider: ToolsTreeProvider
) {
  // Implementación de conexión a servidor
  // Se mostrará en serverManager.ts
}

async function disconnectFromServer(
  serverManager: MCPServerManager,
  serverItem: any,
  serversProvider: ServersTreeProvider,
  toolsProvider: ToolsTreeProvider
) {
  // Implementación de desconexión
  // Se mostrará en serverManager.ts
}

async function executeToolInteractively(
  serverManager: MCPServerManager,
  toolItem: any
) {
  // Implementación de ejecución interactiva de herramientas
  // Se mostrará en toolExecutor.ts
}

async function showToolInspector(toolItem: any) {
  // Implementación del inspector de herramientas
  // Se mostrará en toolInspector.ts
}

async function exportProtocolLogs(serverManager: MCPServerManager) {
  // Implementación de exportación de logs
  // Se mostrará en logsManager.ts
}

async function showBootcampExamples(
  examplesProvider: BootcampExamplesProvider
) {
  // Implementación del selector de ejemplos del bootcamp
  // Se mostrará en bootcampExamplesProvider.ts
}

async function autoDetectBootcampProjects(
  serverManager: MCPServerManager,
  examplesProvider: BootcampExamplesProvider
) {
  // Auto-detección de proyectos del bootcamp en el workspace
  // Se mostrará en projectDetector.ts
}
