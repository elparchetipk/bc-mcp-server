import { ChildProcess, spawn } from 'child_process';
import { EventEmitter } from 'events';
import * as vscode from 'vscode';

/**
 * Configuración de un servidor MCP
 */
export interface MCPServerConfig {
  id: string;
  name: string;
  description?: string;
  command: string;
  args: string[];
  cwd?: string;
  env?: Record<string, string>;
  autoReconnect?: boolean;
}

/**
 * Información básica de un servidor MCP
 */
export interface ServerInfo {
  id: string;
  name: string;
  description: string | undefined;
  workingDirectory: string;
  command: string[];
  status: MCPServerStatus;
}

/**
 * Estado de conexión de un servidor MCP
 */
export enum MCPServerStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected',
  Error = 'error',
}

/**
 * Información de una herramienta MCP
 */
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
  category?: string;
}

/**
 * Entrada de log del protocolo MCP
 */
export interface MCPLogEntry {
  timestamp: Date;
  direction: 'in' | 'out';
  serverId: string;
  message: any;
  type: 'request' | 'response' | 'notification' | 'error';
}

/**
 * Gestor principal de servidores MCP
 *
 * Esta clase maneja todas las conexiones MCP, la comunicación con servidores
 * y proporciona una interfaz unificada para la extensión VS Code.
 */
export class MCPServerManager extends EventEmitter {
  private servers: Map<string, MCPServerConnection> = new Map();
  private logs: MCPLogEntry[] = [];
  private maxLogEntries = 1000;

  constructor() {
    super();
    this.setupEventHandlers();
  }

  /**
   * Evento para cambios de estado de servidores
   */
  onServerStateChanged(callback: () => void): void {
    this.on('serverStateChanged', callback);
  }

  /**
   * Agregar un nuevo servidor MCP
   */
  async addServer(config: MCPServerConfig): Promise<void> {
    if (this.servers.has(config.id)) {
      throw new Error(`Servidor con ID '${config.id}' ya existe`);
    }

    const connection = new MCPServerConnection(config, this);
    this.servers.set(config.id, connection);

    this.emit('serverAdded', config.id);
  }

  /**
   * Conectar a un servidor MCP
   */
  async connectServer(serverId: string): Promise<void> {
    const connection = this.servers.get(serverId);
    if (!connection) {
      throw new Error(`Servidor '${serverId}' no encontrado`);
    }

    await connection.connect();
    this.emit('serverConnected', serverId);
    this.emit('serverStateChanged');
  }

  /**
   * Desconectar de un servidor MCP
   */
  async disconnectServer(serverId: string): Promise<void> {
    const connection = this.servers.get(serverId);
    if (!connection) {
      throw new Error(`Servidor '${serverId}' no encontrado`);
    }

    await connection.disconnect();
    this.emit('serverDisconnected', serverId);
    this.emit('serverStateChanged');
  }

  /**
   * Eliminar un servidor MCP
   */
  async removeServer(serverId: string): Promise<void> {
    const connection = this.servers.get(serverId);
    if (connection) {
      await connection.disconnect();
      this.servers.delete(serverId);
      this.emit('serverRemoved', serverId);
    }
  }

  /**
   * Obtener lista de todos los servidores
   */
  getServers(): MCPServerConfig[] {
    return Array.from(this.servers.values()).map(conn => conn.getConfig());
  }

  /**
   * Obtener información de servidores disponibles
   */
  async getAvailableServers(): Promise<ServerInfo[]> {
    const servers: ServerInfo[] = [];
    for (const [, connection] of this.servers.entries()) {
      const config = connection.getConfig();
      servers.push({
        id: config.id,
        name: config.name,
        description: config.description || undefined,
        workingDirectory: config.cwd || process.cwd(),
        command: [config.command, ...config.args],
        status: connection.getStatus(),
      });
    }
    return servers;
  }

  /**
   * Verificar si un servidor está conectado
   */
  async isServerConnected(serverId: string): Promise<boolean> {
    const connection = this.servers.get(serverId);
    return connection
      ? connection.getStatus() === MCPServerStatus.Connected
      : false;
  }

  /**
   * Obtener herramientas de un servidor específico
   */
  async listTools(serverId: string): Promise<MCPTool[]> {
    const connection = this.servers.get(serverId);
    if (!connection || connection.getStatus() !== MCPServerStatus.Connected) {
      return [];
    }
    return await connection.listTools();
  }

  /**
   * Obtener recursos de un servidor específico
   */
  async listResources(serverId: string): Promise<any[]> {
    const connection = this.servers.get(serverId);
    if (!connection || connection.getStatus() !== MCPServerStatus.Connected) {
      return [];
    }
    return await connection.listResources();
  }

  /**
   * Obtener lista de servidores conectados
   */
  getActiveServers(): string[] {
    return Array.from(this.servers.entries())
      .filter(([_, conn]) => conn.getStatus() === MCPServerStatus.Connected)
      .map(([id, _]) => id);
  }

  /**
   * Obtener estado de un servidor
   */
  getServerStatus(serverId: string): MCPServerStatus {
    const connection = this.servers.get(serverId);
    return connection ? connection.getStatus() : MCPServerStatus.Disconnected;
  }

  /**
   * Obtener herramientas disponibles de un servidor
   */
  async getServerTools(serverId: string): Promise<MCPTool[]> {
    const connection = this.servers.get(serverId);
    if (!connection || connection.getStatus() !== MCPServerStatus.Connected) {
      return [];
    }

    return await connection.listTools();
  }

  /**
   * Ejecutar una herramienta en un servidor específico
   */
  async callTool(serverId: string, toolName: string, args: any): Promise<any> {
    const connection = this.servers.get(serverId);
    if (!connection || connection.getStatus() !== MCPServerStatus.Connected) {
      throw new Error(`Servidor '${serverId}' no está conectado`);
    }

    return await connection.callTool(toolName, args);
  }

  /**
   * Agregar entrada de log
   */
  addLogEntry(entry: MCPLogEntry): void {
    this.logs.push(entry);

    // Mantener límite de logs
    if (this.logs.length > this.maxLogEntries) {
      this.logs.splice(0, this.logs.length - this.maxLogEntries);
    }

    this.emit('logEntry', entry);
  }

  /**
   * Obtener logs del protocolo
   */
  getLogs(serverId?: string): MCPLogEntry[] {
    if (serverId) {
      return this.logs.filter(log => log.serverId === serverId);
    }
    return [...this.logs];
  }

  /**
   * Limpiar logs
   */
  clearLogs(serverId?: string): void {
    if (serverId) {
      this.logs = this.logs.filter(log => log.serverId !== serverId);
    } else {
      this.logs = [];
    }
    this.emit('logsClear', serverId);
  }

  /**
   * Configurar manejadores de eventos
   */
  private setupEventHandlers(): void {
    this.on('serverConnected', (serverId: string) => {
      console.log(`✅ Servidor MCP conectado: ${serverId}`);
    });

    this.on('serverDisconnected', (serverId: string) => {
      console.log(`❌ Servidor MCP desconectado: ${serverId}`);
    });

    this.on('logEntry', (entry: MCPLogEntry) => {
      this.emit('protocolMessage', entry);
    });
  }

  /**
   * Cargar servidores desde configuración del bootcamp
   */
  async loadBootcampServers(): Promise<void> {
    // Detectar proyectos del bootcamp en el workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return;
    }

    for (const folder of workspaceFolders) {
      await this.detectBootcampServersInFolder(folder);
    }
  }

  /**
   * Detectar servidores MCP del bootcamp en una carpeta
   */
  private async detectBootcampServersInFolder(
    folder: vscode.WorkspaceFolder
  ): Promise<void> {
    // Buscar archivos package.json con servidores MCP
    const packageJsonPattern = new vscode.RelativePattern(
      folder,
      '**/package.json'
    );
    const packageJsonFiles =
      await vscode.workspace.findFiles(packageJsonPattern);

    for (const packageFile of packageJsonFiles) {
      try {
        const packageContent = await vscode.workspace.fs.readFile(packageFile);
        const packageData = JSON.parse(packageContent.toString());

        // Detectar si es un servidor MCP del bootcamp
        if (this.isBootcampMCPServer(packageData)) {
          const serverConfig = this.createConfigFromPackageJson(
            packageFile,
            packageData
          );
          if (serverConfig && !this.servers.has(serverConfig.id)) {
            await this.addServer(serverConfig);
          }
        }
      } catch (error) {
        console.warn(`Error procesando ${packageFile.fsPath}:`, error);
      }
    }
  }

  /**
   * Verificar si un package.json pertenece a un servidor MCP del bootcamp
   */
  private isBootcampMCPServer(packageData: any): boolean {
    return (
      packageData.dependencies?.['@modelcontextprotocol/sdk'] ||
      packageData.devDependencies?.['@modelcontextprotocol/sdk'] ||
      packageData.keywords?.includes('mcp') ||
      packageData.keywords?.includes('bootcamp')
    );
  }

  /**
   * Crear configuración de servidor desde package.json
   */
  private createConfigFromPackageJson(
    packageFile: vscode.Uri,
    packageData: any
  ): MCPServerConfig | null {
    const folderPath = packageFile.fsPath.replace('/package.json', '');
    const folderName = folderPath.split('/').pop() || 'unknown';

    // Determinar comando de ejecución
    let command = 'node';
    let args = ['dist/server.js']; // Valor por defecto

    if (packageData.main) {
      args = [packageData.main];
    } else if (packageData.scripts?.start) {
      // Parsear script de start si existe
      const startScript = packageData.scripts.start;
      if (startScript.startsWith('node ')) {
        args = [startScript.replace('node ', '')];
      }
    }

    return {
      id: `bootcamp-${folderName}`,
      name: packageData.name || folderName,
      description:
        packageData.description || `Servidor MCP del bootcamp: ${folderName}`,
      command,
      args,
      cwd: folderPath,
      autoReconnect: true,
    };
  }
}

/**
 * Conexión individual a un servidor MCP
 */
class MCPServerConnection {
  private config: MCPServerConfig;
  private manager: MCPServerManager;
  private process: ChildProcess | null = null;
  private status: MCPServerStatus = MCPServerStatus.Disconnected;
  private messageId = 1;
  private pendingRequests = new Map<
    number,
    { resolve: Function; reject: Function }
  >();
  private tools: MCPTool[] = [];

  constructor(config: MCPServerConfig, manager: MCPServerManager) {
    this.config = config;
    this.manager = manager;
  }

  getConfig(): MCPServerConfig {
    return { ...this.config };
  }

  getStatus(): MCPServerStatus {
    return this.status;
  }

  async connect(): Promise<void> {
    if (this.status === MCPServerStatus.Connected) {
      return;
    }

    this.status = MCPServerStatus.Connecting;

    try {
      // Spawn el proceso del servidor MCP
      this.process = spawn(this.config.command, this.config.args, {
        cwd: this.config.cwd,
        env: { ...process.env, ...this.config.env },
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      if (!this.process.stdin || !this.process.stdout || !this.process.stderr) {
        throw new Error(
          'No se pudo establecer comunicación stdio con el servidor'
        );
      }

      // Configurar manejadores de eventos
      this.process.on('error', error => {
        this.handleProcessError(error);
      });

      this.process.on('exit', code => {
        this.handleProcessExit(code);
      });

      // Configurar comunicación JSON-RPC
      this.setupJSONRPCCommunication();

      // Inicializar conexión MCP
      await this.initializeMCPConnection();

      this.status = MCPServerStatus.Connected;
    } catch (error) {
      this.status = MCPServerStatus.Error;
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
    this.status = MCPServerStatus.Disconnected;
    this.tools = [];
  }

  async listTools(): Promise<MCPTool[]> {
    if (this.status !== MCPServerStatus.Connected) {
      return [];
    }

    try {
      const response = await this.sendRequest('tools/list', {});
      this.tools = response.tools || [];
      return this.tools;
    } catch (error) {
      console.error('Error listando herramientas:', error);
      return [];
    }
  }

  async listResources(): Promise<any[]> {
    if (this.status !== MCPServerStatus.Connected) {
      return [];
    }

    try {
      const response = await this.sendRequest('resources/list', {});
      return response.resources || [];
    } catch (error) {
      console.error('Error listando recursos:', error);
      return [];
    }
  }

  async callTool(name: string, args: any): Promise<any> {
    if (this.status !== MCPServerStatus.Connected) {
      throw new Error('Servidor no conectado');
    }

    const response = await this.sendRequest('tools/call', {
      name,
      arguments: args,
    });
    return response;
  }

  private setupJSONRPCCommunication(): void {
    if (!this.process?.stdout) return;

    let buffer = '';

    this.process.stdout.on('data', data => {
      buffer += data.toString();

      // Procesar mensajes JSON-RPC línea por línea
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Mantener línea incompleta en buffer

      for (const line of lines) {
        if (line.trim()) {
          try {
            const message = JSON.parse(line);
            this.handleIncomingMessage(message);
          } catch (error) {
            console.error(
              'Error parseando mensaje JSON:',
              error,
              'Línea:',
              line
            );
          }
        }
      }
    });
  }

  private handleIncomingMessage(message: any): void {
    // Log del protocolo para debugging educativo
    this.manager.addLogEntry({
      timestamp: new Date(),
      direction: 'in',
      serverId: this.config.id,
      message,
      type: message.error ? 'error' : message.id ? 'response' : 'notification',
    });

    // Manejar respuestas a requests pendientes
    if (message.id && this.pendingRequests.has(message.id)) {
      const { resolve, reject } = this.pendingRequests.get(message.id)!;
      this.pendingRequests.delete(message.id);

      if (message.error) {
        reject(new Error(message.error.message || 'Error del servidor MCP'));
      } else {
        resolve(message.result);
      }
    }
  }

  private async sendRequest(method: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.process?.stdin) {
        reject(new Error('Proceso no disponible'));
        return;
      }

      const id = this.messageId++;
      const request = {
        jsonrpc: '2.0',
        id,
        method,
        params,
      };

      // Log del protocolo
      this.manager.addLogEntry({
        timestamp: new Date(),
        direction: 'out',
        serverId: this.config.id,
        message: request,
        type: 'request',
      });

      // Guardar callback para la respuesta
      this.pendingRequests.set(id, { resolve, reject });

      // Enviar mensaje
      const message = JSON.stringify(request) + '\n';
      this.process.stdin.write(message);

      // Timeout para requests
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 30000); // 30 segundos timeout
    });
  }

  private async initializeMCPConnection(): Promise<void> {
    // Enviar mensaje de inicialización
    await this.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {
        roots: {
          listChanged: false,
        },
      },
      clientInfo: {
        name: 'MCP Bootcamp Studio',
        version: '0.1.0',
      },
    });
  }

  private handleProcessError(error: any): void {
    console.error(`Error en proceso del servidor ${this.config.id}:`, error);
    this.status = MCPServerStatus.Error;
  }

  private handleProcessExit(code: number | null): void {
    console.log(`Servidor ${this.config.id} terminó con código:`, code);
    this.status = MCPServerStatus.Disconnected;

    if (this.config.autoReconnect && code !== 0) {
      // Intentar reconexión automática después de un delay
      setTimeout(() => {
        this.connect().catch(console.error);
      }, 5000);
    }
  }
}
