# Módulo 1: Fundamentos MCP

**Duración**: 7 días **Dificultad**: 🟢 Principiante **Enfoque**: Conceptos base y primeros
servidores MCP

Bienvenido al primer módulo del **Bootcamp MCP Server - De Zero a Hero**. Aquí establecerás las
bases sólidas que necesitas para convertirte en un experto desarrollador de servidores MCP.

## 🎯 Objetivos del módulo

Al completar este módulo serás capaz de:

1. **Comprender** el protocolo MCP y su propósito
2. **Crear** servidores MCP desde cero
3. **Implementar** herramientas básicas con validación
4. **Probar** servidores sin dependencia de GUI
5. **Usar** herramientas de desarrollo para Fedora
6. **Aplicar** mejores prácticas de manejo de errores

## 📅 Estructura temporal

### Días 1-2: Fundamentos

- **Conceptos básicos** del protocolo MCP
- **Tu primer servidor** MCP funcional
- **Herramientas simples** y manejo de errores

### Días 3-4: Consolidación

- **Servidor robusto** con múltiples herramientas
- **Simulador web** para testing visual
- **Cliente CLI** para pruebas automatizadas

### Días 5-7: Aplicación

- **Ejercicios guiados** progresivos
- **Proyecto personal** supervisado
- **Preparación** para módulo 2

## 📂 Estructura del directorio

```text
modulo-01/
├── README.md                    # Este archivo
├── calculadora-basica/          # Días 1-2: Primer servidor
│   ├── server.ts               # Servidor MCP educativo
│   ├── package.json            # Configuración básica
│   └── README.md               # Guía detallada
├── servidor-inicial/            # Días 3-4: Servidor completo
│   ├── calculator-server.ts    # Servidor robusto
│   ├── mcp-web-simulator.html  # Simulador web
│   ├── test-client.js          # Cliente CLI
│   ├── package.json            # Configuración avanzada
│   └── README.md               # Documentación completa
└── ejercicios/                  # Días 5-7: Práctica guiada
    ├── dias-1-2/               # Ejercicios fundamentales
    ├── dias-3-4/               # Ejercicios intermedios
    ├── dias-5-7/               # Proyecto final
    └── README.md               # Guía de ejercicios
```

## 🚀 Comenzar rápidamente

### 1. Instalar dependencias

```bash
cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server
pnpm install
```

### 2. Días 1-2: Calculadora básica

```bash
cd ejemplos/modulo-01/calculadora-basica
pnpm build && pnpm start
```

### 3. Días 3-4: Servidor inicial

```bash
cd ejemplos/modulo-01/servidor-inicial
pnpm build && pnpm start

# En otra terminal, probar
node test-client.js
```

### 4. Días 5-7: Ejercicios

```bash
cd ejemplos/modulo-01/ejercicios/dias-1-2/01-mi-primer-servidor
# Seguir instrucciones del README
```

## 🎓 Metodología pedagógica

### Aprendizaje progresivo

El módulo usa una **metodología incremental**:

1. **Conceptos simples** → **Implementación básica**
2. **Práctica guiada** → **Experimentación libre**
3. **Ejemplos comentados** → **Ejercicios creativos**
4. **Fundamentos sólidos** → **Preparación avanzada**

### Enfoque práctico para Fedora

Dado que trabajamos en **Fedora 42 sin MCP Server Desktop**:

- **Simulador web** integrado para testing visual
- **Cliente CLI** robusto para automatización
- **Scripts de validación** completos
- **Documentación detallada** sin GUI

## 💡 Conceptos clave

### ¿Qué es MCP?

> **Model Context Protocol (MCP)** es un estándar abierto para conectar herramientas, recursos y
> datos con modelos de IA como Claude.

### Analogías útiles

- **Servidor MCP** = Chef especializado en tu cocina
- **Herramientas** = Recetas que sabe preparar
- **Cliente** = Comensal (Claude) que pide platos
- **Protocolo** = Idioma común entre chef y comensal

### Componentes esenciales

1. **Server** - Tu código que implementa herramientas
2. **Client** - Claude u otro modelo que usa las herramientas
3. **Transport** - Canal de comunicación (stdio, HTTP)
4. **Tools** - Funciones específicas que ofreces

## 🛠️ Herramientas para Fedora

### Testing sin GUI

- **Web Simulator** (`mcp-web-simulator.html`)
  - Interfaz visual en navegador
  - Inspector de mensajes MCP
  - Estadísticas en tiempo real

- **CLI Client** (`test-client.js`)
  - Pruebas automatizadas
  - Modo interactivo
  - Generación de reportes

### Desarrollo

- **TypeScript** para type safety
- **pnpm** para gestión de dependencias
- **Scripts automatizados** para workflow fluido

## 📈 Progresión de complejidad

### Nivel 1: Calculadora básica

- **4 herramientas** simples (sumar, restar, multiplicar, dividir)
- **Validación básica** de parámetros
- **Logs educativos** abundantes

### Nivel 2: Servidor inicial

- **7 herramientas** matemáticas
- **Arquitectura modular** en clase
- **Testing avanzado** con cliente CLI

### Nivel 3: Ejercicios personalizados

- **Herramientas creativas** según tu interés
- **Integración** con casos reales
- **Preparación** para módulos avanzados

## 🎯 Evaluación y progreso

### Criterios de dominio

Para avanzar al módulo 2 debes:

- ✅ **Crear servidores MCP** desde cero
- ✅ **Implementar herramientas** con validación robusta
- ✅ **Probar usando CLI** y simulador web
- ✅ **Manejar errores** apropiadamente
- ✅ **Entender el protocolo** MCP profundamente

### Auto-evaluación

Después de cada sección pregúntate:

1. ¿Puedo explicar este concepto a otra persona?
2. ¿Puedo implementar esto desde cero?
3. ¿Entiendo por qué hacemos esto así?
4. ¿Qué pasaría si cambio este parámetro?

## 🔄 Siguientes pasos

### Preparación para Módulo 2

Una vez domines estos fundamentos:

1. **Herramientas avanzadas** - Recursos y prompts
2. **Integración APIs** - Servicios externos
3. **Persistencia** - Almacenamiento de estado
4. **Arquitecturas** más complejas

### Proyecto de transición

Al final del módulo crearás:

- **Servidor MCP personalizado** con 5+ herramientas
- **Documentación completa** del proyecto
- **Suite de pruebas** automatizada
- **Plan de evolución** para módulos futuros

## 📚 Recursos adicionales

### Documentación oficial

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

### Recursos del bootcamp

- [Plan de trabajo](../../../docs/plan-trabajo.md)
- [Mejores prácticas](../../../docs/best_practices_summary.md)
- [Evaluaciones](../../../docs/evaluaciones/)

### Soporte técnico

- Issues en repositorio del bootcamp
- Documentación en `/docs`
- Ejemplos en `/ejemplos`

---

**🎉 ¡Bienvenido al apasionante mundo del desarrollo MCP!**

Este módulo es tu **puerta de entrada** a un universo de posibilidades. Tómate tu tiempo,
experimenta libremente y no dudes en hacer preguntas. El objetivo es que disfrutes aprendiendo
mientras construyes las bases para convertirte en un desarrollador MCP experto.

**💪 ¡Vamos a empezar!**
