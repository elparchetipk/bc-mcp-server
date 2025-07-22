# MCP Bootcamp Studio - Extensión VS Code

**MCP Bootcamp Studio** es la extensión oficial del bootcamp "MCP Server - De Zero a Hero" que
simula la experiencia de MCP Server Desktop directamente en VS Code.

## 🎯 ¿Por qué esta extensión?

Esta extensión fue creada específicamente para estudiantes del bootcamp que:

- **No tienen acceso** a MCP Server Desktop de Anthropic
- **Usan Fedora** u otros sistemas donde MCP Desktop no está disponible
- **Quieren una experiencia integrada** de desarrollo y testing
- **Prefieren trabajar todo en VS Code**

## ✨ Características principales

### 🏗️ **Gestión visual de servidores MCP**

- Agregar servidores con un click
- Conectar/desconectar visualmente
- Auto-detección de proyectos del bootcamp
- Estado de conexión en tiempo real

### 🧪 **Testing interactivo de herramientas**

- Lista visual de herramientas disponibles
- Ejecución con un click
- Formularios dinámicos para parámetros
- Resultados formateados y legibles

### 💬 **Chat Simulator estilo Claude Desktop**

- Interface conversacional familiar
- Detección automática de necesidad de herramientas
- Ejecución transparente de herramientas MCP
- Historial de conversaciones

### 📊 **Logs educativos del protocolo**

- Ver comunicación MCP en tiempo real
- Logs estructurados para aprendizaje
- Export de logs para debugging
- Filtros por servidor y tipo de mensaje

### 🎓 **Integración con bootcamp**

- Carga automática de ejemplos del bootcamp
- Documentación integrada
- Enlaces a recursos educativos
- Templates de servidores comunes

## 🚀 Instalación

### Desde VS Code Marketplace (próximamente)

1. Abrir VS Code
2. Ir a Extensions (`Ctrl+Shift+X`)
3. Buscar "MCP Bootcamp Studio"
4. Click en Install

### Instalación manual (desarrollo)

1. Clonar el repositorio del bootcamp
2. Navegar a `herramientas/mcp-bootcamp-studio`
3. Ejecutar `npm install`
4. Ejecutar `npm run compile`
5. Presionar `F5` para ejecutar en modo debug

## 📖 Uso básico

### 1. **Agregar tu primer servidor MCP**

1. Abrir el panel "MCP Bootcamp Studio" en la barra lateral
2. Click en "+" en la sección "Servidores MCP"
3. Seleccionar o configurar tu servidor
4. Click "Conectar"

### 2. **Testing de herramientas**

1. Una vez conectado, ver herramientas en "Herramientas Disponibles"
2. Click en cualquier herramienta para ejecutarla
3. Completar parámetros en el formulario
4. Ver resultados en el panel

### 3. **Chat Simulator**

1. Click en "Chat Simulator"
2. Escribir mensajes naturales
3. La extensión detectará automáticamente qué herramientas usar
4. Ver ejecución transparente de herramientas

### 4. **Debugging con logs**

1. Ver "Protocol Logs" para comunicación detallada
2. Filtrar por servidor o tipo de mensaje
3. Exportar logs para análisis posterior

## 🎯 Casos de uso del bootcamp

### **Módulo 1: Fundamentos**

- Conectar a calculadora básica
- Testing visual de operaciones matemáticas
- Ver protocolo MCP paso a paso
- Debugging de primeros servidores

### **Módulo 2: Herramientas avanzadas**

- Testing de recursos y prompts
- Chat simulator para casos complejos
- Integración con APIs externas
- Debugging de herramientas avanzadas

### **Módulos avanzados**

- Conexión a múltiples servidores
- Testing de arquitecturas complejas
- Simulación de casos de producción
- Desarrollo iterativo con feedback inmediato

## ⚙️ Configuración

### **Auto-conectar servidores**

```json
{
  "mcpBootcamp.autoConnect": true
}
```

### **Mostrar logs detallados**

```json
{
  "mcpBootcamp.showProtocolLogs": true
}
```

### **Chat Simulator habilitado**

```json
{
  "mcpBootcamp.chatSimulator.enabled": true,
  "mcpBootcamp.chatSimulator.autoDetectTools": true
}
```

### **Cargar ejemplos automáticamente**

```json
{
  "mcpBootcamp.examples.autoLoad": true
}
```

## 🔧 Comandos disponibles

| Comando                            | Descripción                      |
| ---------------------------------- | -------------------------------- |
| `MCP Bootcamp: Add Server`         | Agregar nuevo servidor MCP       |
| `MCP Bootcamp: Refresh Servers`    | Refrescar lista de servidores    |
| `MCP Bootcamp: Clear Logs`         | Limpiar logs del protocolo       |
| `MCP Bootcamp: Export Logs`        | Exportar logs para análisis      |
| `MCP Bootcamp: Open Documentation` | Abrir documentación del bootcamp |
| `MCP Bootcamp: Run Example`        | Ejecutar ejemplo del bootcamp    |

## 🐛 Troubleshooting

### **Servidor no conecta**

1. Verificar que el servidor esté compilado (`npm run build`)
2. Verificar ruta del ejecutable en configuración
3. Ver logs de error en "Protocol Logs"
4. Verificar que Node.js esté disponible

### **Herramientas no aparecen**

1. Verificar que el servidor esté conectado (icono verde)
2. Refrescar con el botón de refresh
3. Ver logs para errores de comunicación

### **Chat simulator no funciona**

1. Verificar configuración `mcpBootcamp.chatSimulator.enabled`
2. Conectar al menos un servidor MCP
3. Verificar que las herramientas estén disponibles

## 📚 Recursos adicionales

- [Bootcamp MCP Server - De Zero a Hero](../../../README.md)
- [Documentación MCP](https://modelcontextprotocol.io/)
- [Ejemplos del bootcamp](../../../ejemplos/)
- [Issues y soporte](https://github.com/tu-usuario/bc-mcp-server/issues)

## 🤝 Contribuir

Esta extensión es parte del bootcamp MCP Server. Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crear rama para feature
3. Implementar cambios
4. Crear Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](../../LICENSE) para detalles.

---

**🎉 ¡Disfruta desarrollando servidores MCP con una experiencia premium!**

Esta extensión elimina todas las barreras técnicas para que puedas concentrarte en aprender y crear
servidores MCP increíbles.
