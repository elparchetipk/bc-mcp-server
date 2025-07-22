# Plantilla Base para Servidores MCP

Esta plantilla proporciona una estructura básica y bien documentada para crear servidores MCP (Model Context Protocol) en el bootcamp.

## 🎯 Características

- ✅ **Estructura básica** de servidor MCP
- ✅ **TypeScript** configurado con tipos estrictos
- ✅ **Dos herramientas de ejemplo** (`echo` y `get_current_time`)
- ✅ **Manejo de errores** robusto
- ✅ **Documentación completa** del código
- ✅ **Scripts de desarrollo** preconfigurados
- ✅ **Testing** con Vitest configurado

## 🚀 Uso Rápido

### 1. Copiar la plantilla

```bash
# Desde la raíz del bootcamp
cp -r plantillas/servidor-base mi-servidor-mcp
cd mi-servidor-mcp
```

### 2. Personalizar el proyecto

```bash
# Editar package.json - cambiar nombre y descripción
nano package.json

# Instalar dependencias
pnpm install
```

### 3. Desarrollar

```bash
# Modo desarrollo (reconstruye automáticamente)
pnpm dev

# En otra terminal, probar el servidor
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node dist/index.js
```

## 📋 Estructura del Proyecto

```
servidor-base/
├── src/
│   └── index.ts          # Código principal del servidor
├── package.json          # Configuración y dependencias
├── tsconfig.json         # Configuración de TypeScript
└── README.md            # Esta documentación
```

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm build` | Compilar TypeScript a JavaScript |
| `pnpm dev` | Desarrollo con recarga automática |
| `pnpm start` | Ejecutar el servidor compilado |
| `pnpm test` | Ejecutar tests |
| `pnpm test:watch` | Tests en modo observación |
| `pnpm lint` | Linting del código |
| `pnpm format` | Formatear código |

## 🧪 Herramientas de Ejemplo

### `echo`
Devuelve el texto que recibe como entrada.

**Parámetros:**
- `text` (string): El texto a devolver

**Ejemplo:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "echo",
    "arguments": {
      "text": "¡Hola desde MCP!"
    }
  }
}
```

### `get_current_time`
Obtiene la fecha y hora actual en formato español.

**Parámetros:** Ninguno

**Ejemplo:**
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_current_time",
    "arguments": {}
  }
}
```

## 🎓 Conceptos Clave Demostrados

1. **Configuración del Servidor**
   - Creación de instancia con metadata
   - Declaración de capacidades

2. **Handlers de Request**
   - `ListToolsRequestSchema`: Para listar herramientas
   - `CallToolRequestSchema`: Para ejecutar herramientas

3. **Manejo de Errores**
   - Try-catch en handlers
   - Respuestas de error estructuradas
   - Manejo de errores de proceso

4. **Mejores Prácticas**
   - Documentación de código
   - Tipos TypeScript estrictos
   - Validación de parámetros
   - Logging descriptivo

## 🔄 Próximos Pasos

1. **Personalizar** el nombre y descripción en `package.json`
2. **Agregar nuevas herramientas** siguiendo el patrón existente
3. **Implementar lógica específica** para tu caso de uso
4. **Agregar tests** para tus herramientas
5. **Documentar** las nuevas funcionalidades

## 📚 Recursos Adicionales

- [Documentación oficial MCP](https://docs.anthropic.com/mcp)
- [Ejemplos del bootcamp](../../ejemplos/)
- [Mejores prácticas](../../docs/best_practices_summary.md)

---

*Esta plantilla es parte del **MCP Server Bootcamp**. ¡Feliz desarrollo! 🚀*
