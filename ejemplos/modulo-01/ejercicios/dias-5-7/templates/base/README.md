# Mi Servidor MCP Personalizado

**Autor**: [Tu nombre aquí] **Proyecto**: Módulo 1 - Días 5-7 **Tema**: [Describe el tema general de
tu servidor]

## 📝 Descripción

[Escribe aquí una descripción de 2-3 párrafos sobre qué hace tu servidor MCP, para qué casos de uso
está diseñado y por qué es útil.]

## 🛠️ Herramientas disponibles

### [Nombre de herramienta 1]

- **Descripción**: [Qué hace esta herramienta]
- **Parámetros**: [Lista los parámetros que recibe]
- **Ejemplo**: `{"parametro": "valor"}`

### [Nombre de herramienta 2]

- **Descripción**: [Qué hace esta herramienta]
- **Parámetros**: [Lista los parámetros que recibe]
- **Ejemplo**: `{"parametro": "valor"}`

### [Agregar más herramientas...]

## 🚀 Instalación y uso

### Prerequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar/descargar el proyecto
git clone [url] o descargar zip

# Instalar dependencias
pnpm install

# Compilar TypeScript
pnpm build
```

### Ejecutar el servidor

```bash
# Iniciar servidor MCP
pnpm start

# En otra terminal, probar con cliente
node tests/client.js
```

### Uso con simulador web

1. Abrir `web-simulator.html` en navegador
2. Conectar al servidor (si está configurado para HTTP)
3. Probar las herramientas interactivamente

## 📋 Ejemplos de uso

### Ejemplo 1: [Caso de uso típico]

```javascript
// Llamada a la herramienta
{
  "tool": "nombre-herramienta",
  "arguments": {
    "parametro1": "valor1",
    "parametro2": "valor2"
  }
}

// Respuesta esperada
{
  "content": [
    {
      "type": "text",
      "text": "Resultado de la operación..."
    }
  ]
}
```

### [Más ejemplos...]

## 🧪 Testing

### Pruebas manuales

```bash
# Cliente interactivo
node tests/client.js

# Pruebas automáticas
node tests/integration/run-all.js
```

### Casos de prueba cubiertos

- ✅ Herramientas con parámetros válidos
- ✅ Validación de parámetros incorrectos
- ✅ Manejo de errores
- ✅ Casos edge específicos del dominio

## 🏗️ Arquitectura

### Estructura del proyecto

```text
src/
├── server.ts           # Servidor MCP principal
├── tools/             # Herramientas organizadas
│   ├── tool1.ts
│   ├── tool2.ts
│   └── index.ts
├── types/             # Interfaces TypeScript
│   └── index.ts
└── utils/             # Utilidades comunes
    └── validation.ts

tests/
├── client.js          # Cliente de testing
└── integration/       # Pruebas automáticas

docs/
└── USAGE.md          # Guía detallada de uso
```

### Decisiones de diseño

- **[Decisión 1]**: [Explicación de por qué elegiste este enfoque]
- **[Decisión 2]**: [Explicación de por qué elegiste este enfoque]

## 🐛 Troubleshooting

### El servidor no inicia

- Verificar Node.js versión >= 18
- Ejecutar `pnpm install` para instalar dependencias
- Revisar logs en consola para errores específicos

### Las herramientas no responden

- Verificar que el servidor esté compilado (`pnpm build`)
- Revisar validación de parámetros en logs
- Probar con ejemplos documentados

### [Más problemas comunes...]

## 🔄 Próximos pasos

### Mejoras planeadas

- [ ] [Mejora 1 que agregarías]
- [ ] [Mejora 2 que agregarías]
- [ ] [Mejora 3 que agregarías]

### Evolución hacia Módulo 2

Este proyecto me prepara para:

- **Herramientas más complejas** con estado persistente
- **Integración con APIs** externas
- **Recursos y prompts** dinámicos
- **Arquitecturas distribuidas**

## 📚 Referencias

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Bootcamp MCP Server](../../../)

## 📄 Licencia

MIT License - Úsalo y modifícalo libremente para aprender.

---

**🎉 ¡Gracias por revisar mi proyecto!**

Este servidor representa mi comprensión de los fundamentos MCP y mi creatividad para aplicarlos a
casos de uso reales.

**Feedback bienvenido**: [tu-email@ejemplo.com]
