# Servidor Inicial MCP - Días 3-4

Este es el **servidor MCP completo** que usarás durante los días 3-4 del módulo 1. Representa la
evolución natural de la calculadora básica, con más herramientas, mejor arquitectura y herramientas
de testing profesionales.

## 🎯 Qué incluye este directorio

### 📁 Archivos principales

- **`calculator-server.ts`** - Servidor MCP completo con herramientas matemáticas
- **`mcp-web-simulator.html`** - Simulador web interactivo para Fedora 42
- **`test-client.js`** - Cliente CLI de testing sin dependencia de GUI
- **`package.json`** - Configuración del proyecto y scripts

### 🔧 Herramientas matemáticas disponibles

1. **add** - Suma dos números
2. **subtract** - Resta dos números
3. **multiply** - Multiplica dos números
4. **divide** - Divide dos números (con validación de división por cero)
5. **power** - Eleva un número a una potencia
6. **sqrt** - Calcula raíz cuadrada
7. **percentage** - Calcula porcentajes

## 🚀 Uso rápido

### Instalar dependencias (desde la raíz del proyecto)

```bash
cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server
pnpm install
```

### Ejecutar el servidor

```bash
cd ejemplos/modulo-01/servidor-inicial
pnpm build && pnpm start
```

### Probar con el cliente CLI

```bash
# En otra terminal
node test-client.js
```

### Usar el simulador web

```bash
# Abrir en navegador
firefox mcp-web-simulator.html
# O
chromium mcp-web-simulator.html
```

## 🎨 Simulador Web Interactivo

El `mcp-web-simulator.html` es especialmente útil para el entorno **Fedora 42** sin MCP Server
Desktop:

### ✨ Características

- **🌙 Tema oscuro** profesional
- **📊 Inspector de mensajes** en tiempo real
- **📈 Estadísticas** de uso de herramientas
- **⚡ Ejemplos rápidos** predefinidos
- **🔍 Parser robusto** de JSON
- **📝 Logs pedagógicos** explicativos

### 🎯 Casos de uso

1. **Desarrollo**: Prueba herramientas rápidamente
2. **Debugging**: Inspecciona mensajes MCP
3. **Aprendizaje**: Ve el protocolo en acción
4. **Demostración**: Muestra MCP funcionando

## 🧪 Cliente de Testing CLI

El `test-client.js` es perfecto para testing automatizado:

### Modo interactivo

```bash
node test-client.js
```

### Pruebas automáticas

```bash
node test-client.js --auto
```

### Generar reporte

```bash
node test-client.js --report
```

## 🏗️ Arquitectura del servidor

### Estructura modular

```typescript
class CalculatorMCPServer {
  constructor()              // Configuración inicial
  setupEventHandlers()       // Manejo de eventos MCP
  validateNumbers()          // Validación robusta
  logInfo/logError()         // Sistema de logging
  run()                      // Inicialización
}
```

### Patrones implementados

- **Validación de entrada** rigurosa
- **Manejo de errores** detallado
- **Logging informativo** para debugging
- **Respuestas pedagógicas** para aprendizaje

## 📚 Progresión pedagógica

### Desde calculadora básica

Si vienes de `../calculadora-basica/`:

1. **Más herramientas** - De 4 a 7 operaciones
2. **Mejor validación** - Casos edge cubiertos
3. **Arquitectura limpia** - Código organizado en clase
4. **Testing avanzado** - Simulador + cliente CLI

### Hacia ejercicios intermedios

Este servidor te prepara para:

1. **Ejercicios de días 3-4** - Integración y personalización
2. **Módulo 2** - Herramientas más complejas
3. **Persistencia** - Almacenamiento de resultados
4. **APIs externas** - Integración con servicios

## 🎓 Conceptos que aprenderás

### Días 3-4 específicos

- **Servidor MCP robusto** con múltiples herramientas
- **Testing sin GUI** en Fedora
- **Simulador web** para desarrollo
- **Arquitectura escalable**

### Preparación para módulo 2

- **Herramientas avanzadas** (recursos, prompts)
- **Integración APIs** externas
- **Manejo de estado** complejo
- **Persistencia** de datos

## 🔧 Scripts disponibles

```bash
pnpm build          # Compilar TypeScript
pnpm start          # Ejecutar servidor
pnpm dev            # Build + start
pnpm test           # Ejecutar cliente de pruebas
pnpm clean          # Limpiar dist/
```

## 🐛 Troubleshooting

### El servidor no inicia

```bash
# Verificar dependencias
pnpm install

# Limpiar y recompilar
pnpm clean && pnpm build
```

### Error de compilación TypeScript

```bash
# Verificar versión Node.js
node --version  # Debe ser >= 18

# Reinstalar dependencias
rm -rf node_modules && pnpm install
```

### El cliente no conecta

```bash
# Verificar que el servidor esté ejecutándose
ps aux | grep calculator-server

# Probar con logs de debugging
node test-client.js --verbose
```

## 🔗 Enlaces útiles

- [MCP Protocol Docs](https://modelcontextprotocol.io)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Ejercicios del módulo](../ejercicios/)
- [Calculadora básica](../calculadora-basica/)

---

**🎉 ¡Disfruta explorando el mundo MCP!**

Este servidor representa un **hito importante** en tu aprendizaje. Una vez que lo domines, estarás
listo para crear servidores MCP profesionales para casos de uso reales.
