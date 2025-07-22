import * as vscode from 'vscode';
import { MCPServerManager, ServerInfo } from '../mcp/serverManager';

/**
 * Provider para la vista de árbol de servidores MCP
 * Muestra todos los servidores disponibles y su estado de conexión
 */
export class ServersTreeProvider
  implements vscode.TreeDataProvider<ServerTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    ServerTreeItem | undefined | null | void
  > = new vscode.EventEmitter<ServerTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    ServerTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  constructor(private serverManager: MCPServerManager) {
    // Escuchar cambios en el estado de los servidores
    this.serverManager.onServerStateChanged(() => {
      this.refresh();
    });
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: ServerTreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: ServerTreeItem): Promise<ServerTreeItem[]> {
    if (!element) {
      // Nodos raíz: servidores disponibles
      const servers = await this.serverManager.getAvailableServers();
      return servers.map(
        server =>
          new ServerTreeItem(server, vscode.TreeItemCollapsibleState.Collapsed)
      );
    } else {
      // Hijos de un servidor: información detallada
      return this.getServerDetails(element.server);
    }
  }

  private async getServerDetails(
    server: ServerInfo
  ): Promise<ServerTreeItem[]> {
    const details: ServerTreeItem[] = [];

    // Estado de conexión
    const isConnected = await this.serverManager.isServerConnected(server.name);
    details.push(
      new ServerDetailItem(
        'Estado',
        isConnected ? '🟢 Conectado' : '🔴 Desconectado'
      )
    );

    // Información básica
    details.push(new ServerDetailItem('Directorio', server.workingDirectory));
    details.push(new ServerDetailItem('Comando', server.command.join(' ')));

    // Si está conectado, mostrar estadísticas
    if (isConnected) {
      const tools = await this.serverManager.listTools(server.name);
      details.push(
        new ServerDetailItem('Herramientas', `${tools.length} disponibles`)
      );

      const resources = await this.serverManager.listResources(server.name);
      details.push(
        new ServerDetailItem('Recursos', `${resources.length} disponibles`)
      );
    }

    return details;
  }
}

/**
 * Item de servidor en el árbol
 */
export class ServerTreeItem extends vscode.TreeItem {
  constructor(
    public readonly server: ServerInfo,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(server.name, collapsibleState);

    this.tooltip = `Servidor MCP: ${server.name}`;
    this.description = server.description || server.workingDirectory;

    // Iconos según el estado
    this.iconPath = new vscode.ThemeIcon('server-process');

    // Comandos contextuales
    this.contextValue = 'mcpServer';
  }
}

/**
 * Item de detalle de servidor
 */
export class ServerDetailItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly value: string
  ) {
    super(`${label}: ${value}`, vscode.TreeItemCollapsibleState.None);

    this.tooltip = value;
    this.contextValue = 'serverDetail';

    // Iconos según el tipo de información
    switch (label) {
      case 'Estado':
        this.iconPath = new vscode.ThemeIcon('pulse');
        break;
      case 'Directorio':
        this.iconPath = new vscode.ThemeIcon('folder');
        break;
      case 'Comando':
        this.iconPath = new vscode.ThemeIcon('terminal');
        break;
      case 'Herramientas':
        this.iconPath = new vscode.ThemeIcon('tools');
        break;
      case 'Recursos':
        this.iconPath = new vscode.ThemeIcon('database');
        break;
      default:
        this.iconPath = new vscode.ThemeIcon('info');
    }
  }
}
