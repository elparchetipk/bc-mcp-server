# Guía de Contribución - Bootcamp MCP Server

¡Gracias por tu interés en contribuir al Bootcamp MCP Server! Esta guía te ayudará a participar efectivamente en el proyecto y seguir las mejores prácticas establecidas.

## 🚀 Cómo Contribuir

### Tipos de Contribuciones Bienvenidas

- **📚 Mejoras de documentación**
- **💻 Ejemplos de código y ejercicios**
- **🐛 Corrección de errores**
- **✨ Nuevas funcionalidades**
- **🧪 Tests y validaciones**
- **🎨 Mejoras de UI/UX**
- **🔧 Herramientas y automatización**
- **📋 Plantillas y recursos**

## 📋 Requisitos Previos

### Tecnologías Principales

Asegúrate de tener instalado:

- **Node.js** 18+ y **pnpm** 8+
- **Python** 3.11+ (para ejemplos FastAPI)
- **Docker** y **Docker Compose**
- **Git** para control de versiones
- **VS Code** (recomendado con extensiones del proyecto)

### Configuración del Entorno

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/mcp-server-bootcamp.git
cd mcp-server-bootcamp

# Instalar dependencias
pnpm install

# Configurar el entorno
pnpm run setup

# Verificar la instalación
pnpm run verify-setup
```

## 🎯 Estructura del Proyecto

### Organización de Directorios

```
bc-mcp-server/
├── docs/                    # 📚 Documentación del bootcamp
│   ├── modulos/            # Documentación por módulo
│   ├── assets/             # Recursos visuales
│   └── evaluaciones/       # Rúbricas y criterios
├── ejemplos/               # 💻 Ejemplos prácticos
│   ├── modulo-01/          # Fundamentos
│   ├── modulo-02/          # Herramientas avanzadas
│   └── ...                 # Otros módulos
├── scripts/                # 🔧 Scripts de automatización
├── plantillas/             # 📋 Plantillas base
├── tests/                  # 🧪 Tests del bootcamp
└── herramientas/           # 🛠️ Herramientas auxiliares
```

### Convenciones de Nombres

- **Carpetas**: `kebab-case` (ej. `modulo-01-fundamentos`)
- **Archivos TypeScript**: `PascalCase.ts` para clases, `camelCase.ts` para funciones
- **Archivos Python**: `snake_case.py`
- **Scripts**: `kebab-case.sh`
- **Documentación**: `SCREAMING_SNAKE_CASE.md` para archivos principales, `kebab-case.md` para otros

## 📝 Estándares de Código

### TypeScript (Lenguaje Principal)

```typescript
// ✅ Buenas prácticas para servidores MCP
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

/**
 * Servidor MCP para [descripción específica]
 * Implementa [funcionalidades principales]
 */
const server = new Server(
  {
    name: 'nombre-descriptivo',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// Siempre incluir manejo de errores
try {
  // Lógica del servidor
} catch (error) {
  return {
    content: [
      {
        type: 'text',
        text: `Error: ${error.message}`,
      },
    ],
    isError: true,
  };
}
```

### Comentarios en Código

- **Comentarios principales**: En español para facilitar el aprendizaje
- **Documentación técnica**: JSDoc en inglés cuando sea estándar
- **Explicaciones pedagógicas**: Siempre en español

```typescript
// ✅ Ejemplo de comentarios apropiados
/**
 * Herramienta para calcular operaciones matemáticas básicas
 * Diseñada para enseñar conceptos fundamentales de MCP
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'calculator',
        description: 'Realiza operaciones matemáticas básicas (+, -, *, /)',
        inputSchema: {
          // Schema de validación aquí
        },
      },
    ],
  };
});
```

## 🔄 Proceso de Contribución

### 1. Preparación

```bash
# Crear fork del repositorio
# Clonar tu fork
git clone https://github.com/tu-usuario/mcp-server-bootcamp.git
cd mcp-server-bootcamp

# Configurar remote upstream
git remote add upstream https://github.com/original-usuario/mcp-server-bootcamp.git

# Crear rama para tu contribución
git checkout -b feat/nueva-funcionalidad
```

### 2. Desarrollo

- **Sigue la estructura del proyecto** definida en copilot-instructions
- **Escribe código limpio y documentado**
- **Incluye tests** cuando sea apropiado
- **Actualiza documentación** relacionada

### 3. Testing

```bash
# Ejecutar tests
pnpm test

# Verificar lint
pnpm run lint

# Ejecutar tests específicos de módulo
pnpm test:modulo-01

# Verificar ejemplos funcionan
pnpm run verify-examples
```

### 4. Commits

Usamos **Conventional Commits** para mantener un historial claro:

```bash
# Formato: tipo(scope): descripción
git commit -m "feat(module-2): add dynamic prompts example"
git commit -m "docs(contributing): update setup instructions"
git commit -m "fix(calculator): handle division by zero error"
git commit -m "test(persistence): add integration tests"
```

#### Tipos de Commit

- **feat**: Nueva funcionalidad o ejemplo
- **fix**: Corrección de errores
- **docs**: Cambios en documentación
- **test**: Agregar o actualizar tests
- **refactor**: Refactorización de código
- **chore**: Tareas de mantenimiento
- **build**: Cambios en sistema de build
- **ci**: Cambios en CI/CD

#### Scopes Comunes

- **module-1** a **module-7**: Para cambios específicos de módulo
- **examples**: Para ejemplos generales
- **docs**: Para documentación
- **tooling**: Para herramientas y scripts
- **templates**: Para plantillas
- **config**: Para configuración

### 5. Pull Request

```bash
# Actualizar con cambios upstream
git fetch upstream
git rebase upstream/main

# Push a tu fork
git push origin feat/nueva-funcionalidad

# Crear Pull Request desde GitHub
```

## 📚 Contribuciones por Módulo

### Módulo 1: Fundamentos

- **Enfoque**: Claridad y conceptos básicos
- **Ejemplos**: Calculadoras, conversores simples
- **Documentación**: Explicaciones detalladas con analogías

### Módulo 2: Herramientas Avanzadas

- **Enfoque**: Recursos dinámicos y prompts inteligentes
- **Ejemplos**: Gestores de recursos, integraciones API simples
- **Documentación**: Conexión con conceptos previos

### Módulo 3: Persistencia

- **Enfoque**: Bases de datos y ORMs
- **Ejemplos**: SQLite, PostgreSQL, Prisma
- **Documentación**: Patrones de datos seguros

### Módulo 4: Seguridad

- **Enfoque**: Validación y autenticación
- **Ejemplos**: RBAC, auditoría, autenticación
- **Documentación**: Consideraciones de seguridad

### Módulo 5: Testing

- **Enfoque**: Calidad y automatización
- **Ejemplos**: Tests unitarios, CI/CD
- **Documentación**: Estrategias de testing

### Módulo 6: Arquitecturas Avanzadas

- **Enfoque**: Escalabilidad y microservicios
- **Ejemplos**: Docker, Kubernetes, performance
- **Documentación**: Patrones empresariales

### Módulo 7: Proyecto Final

- **Enfoque**: Aplicación integral
- **Ejemplos**: E-commerce, fintech, healthcare
- **Documentación**: Arquitectura completa

## 🔍 Revisión de Código

### Criterios de Revisión

- **✅ Funcionalidad**: El código hace lo que debe hacer
- **✅ Claridad**: Es fácil de entender y mantener
- **✅ Estándares**: Sigue las convenciones del proyecto
- **✅ Tests**: Incluye pruebas apropiadas
- **✅ Documentación**: Está bien documentado
- **✅ Seguridad**: No introduce vulnerabilidades
- **✅ Performance**: Es eficiente y escalable

### Proceso de Review

1. **Autorevisión**: Revisa tu propio código antes de enviar
2. **Revisión automática**: CI/CD ejecuta tests y lint
3. **Revisión por pares**: Otros contribuidores revisan
4. **Iteración**: Implementar feedback recibido
5. **Aprobación**: Al menos una aprobación requerida
6. **Merge**: Integración al proyecto principal

## 🐛 Reportar Issues

### Información Requerida

```markdown
## Descripción del Problema

Descripción clara y concisa del issue.

## Pasos para Reproducir

1. Ir a '...'
2. Hacer clic en '...'
3. Ejecutar '...'
4. Ver error

## Comportamiento Esperado

Lo que esperabas que pasara.

## Comportamiento Actual

Lo que realmente pasó.

## Entorno

- OS: [ej. Ubuntu 22.04]
- Node.js: [ej. 18.17.0]
- pnpm: [ej. 8.6.0]
- Docker: [ej. 24.0.2]

## Contexto Adicional

Screenshots, logs, etc.
```

### Etiquetas de Issues

- **bug**: Errores que necesitan corrección
- **enhancement**: Mejoras o nuevas funcionalidades
- **documentation**: Mejoras en documentación
- **good first issue**: Ideal para nuevos contribuidores
- **help wanted**: Necesita ayuda de la comunidad
- **module-X**: Específico de un módulo
- **priority-high**: Requiere atención urgente

## 📖 Contribuir a la Documentación

### Estándares de Documentación

- **Idioma**: Español para contenido pedagógico
- **Formato**: Markdown con estructura clara
- **Imágenes**: Optimizadas y con alt text
- **Enlaces**: Verificados y funcionales
- **Ejemplos**: Código funcional y testeable

### Tipos de Documentación

1. **Documentación de módulos**: Conceptos y ejercicios
2. **Documentación técnica**: APIs y referencias
3. **Guías de uso**: Tutoriales paso a paso
4. **Documentación de desarrollo**: Setup y contribuciones

## 🎓 Recursos para Contribuidores

### Enlaces Útiles

- **Documentación MCP**: [Oficial](https://modelcontextprotocol.io)
- **TypeScript Handbook**: [Guía oficial](https://www.typescriptlang.org/docs/)
- **Conventional Commits**: [Especificación](https://www.conventionalcommits.org/)
- **GitHub Flow**: [Guía de workflow](https://guides.github.com/introduction/flow/)

### Herramientas Recomendadas

- **VS Code Extensions**: Configuración incluida en `.vscode/`
- **Prettier**: Formateo automático de código
- **ESLint**: Análisis estático de código
- **Docker**: Para entornos consistentes

## 🎉 Reconocimiento

### Contribuidores

Todos los contribuidores son reconocidos en:

- **README principal** del proyecto
- **Sección de créditos** en documentación
- **Release notes** cuando aplique
- **Hall of Fame** para contribuidores destacados

### Niveles de Contribución

- **🌟 Colaborador**: 1-5 PRs aceptados
- **⭐ Contribuidor Activo**: 6-15 PRs aceptados
- **🏆 Contribuidor Principal**: 16+ PRs o contribuciones significativas
- **👑 Mantenedor**: Acceso de escritura al repositorio

## ❓ ¿Necesitas Ayuda?

### Canales de Comunicación

- **GitHub Issues**: Para reportes específicos
- **GitHub Discussions**: Para preguntas generales
- **Discord/Slack**: Para chat en tiempo real
- **Email**: bootcamp@mcp-server.dev

### Mentores Disponibles

- **Fundamentos (Módulos 1-2)**: @mentor-fundamentals
- **Backend (Módulos 3-4)**: @mentor-backend
- **Testing (Módulo 5)**: @mentor-testing
- **Arquitectura (Módulos 6-7)**: @mentor-architecture

## 📄 Licencia

Al contribuir a este proyecto, aceptas que tus contribuciones sean licenciadas bajo la misma licencia MIT del proyecto.

---

**¡Gracias por contribuir al Bootcamp MCP Server!** 🚀

Tu participación ayuda a crear un recurso educativo valioso para toda la comunidad de desarrolladores MCP.
