# Calculadora Básica MCP - Días 1-2

Este es tu **primer servidor MCP** del bootcamp. Es deliberadamente simple para que puedas entender
los conceptos fundamentales sin perderte en detalles complejos.

## 🎯 Objetivo Pedagógico

Al completar esta actividad aprenderás:

1. **Estructura básica de un servidor MCP**
2. **Cómo definir herramientas (tools)**
3. **Comunicación cliente-servidor básica**
4. **Manejo de errores fundamental**

## 🏗️ Arquitectura Simple

```text
calculadora-basica/
├── server.ts          # Servidor MCP principal
├── package.json       # Configuración del proyecto
├── tsconfig.json      # Configuración TypeScript
└── README.md          # Esta documentación
```

## 📚 Conceptos Clave

### ¿Qué es un Servidor MCP?

> **Analogía**: Imagina que el servidor MCP es como un **chef especializado** en tu cocina. Claude
> (el cliente) puede pedirle que prepare platos específicos (herramientas), y el chef sabe
> exactamente cómo hacerlo.

- **Servidor**: El "chef" que sabe hacer cálculos
- **Cliente**: Claude que pide los cálculos
- **Herramientas**: Las "recetas" matemáticas disponibles
- **Protocolo**: El "idioma" que usan para comunicarse

### Flujo de Comunicación

```text
1. Claude dice: "¿Qué herramientas tienes disponibles?"
2. Servidor: "Puedo sumar, restar, multiplicar y dividir"
3. Claude: "Suma 5 + 3 por favor"
4. Servidor: "El resultado es 8"
```

## 🚀 Empezando

### Prerequisitos

- Node.js 18+
- pnpm o npm
- TypeScript básico

### Instalación

```bash
cd calculadora-basica
pnpm install
```

### Compilar y ejecutar

```bash
# Compilar TypeScript
pnpm build

# Ejecutar servidor
pnpm start
```

### Probar con el cliente

```bash
# En otra terminal
node ../servidor-inicial/test-client.js
```

## 📖 Código Paso a Paso

### 1. Configuración Básica

El servidor necesita tres cosas fundamentales:

- **Nombre e identificación**
- **Capacidades** (qué puede hacer)
- **Manejadores** (cómo responde a peticiones)

### 2. Definir Herramientas

Cada herramienta necesita:

- **Nombre único**
- **Descripción clara**
- **Esquema de parámetros**
- **Función de ejecución**

### 3. Manejo de Errores

Siempre incluir:

- **Validación de entrada**
- **Mensajes de error claros**
- **Casos edge (ej: división por cero)**

## 🎯 Ejercicios Sugeridos

1. **Básico**: Ejecuta el servidor y prueba cada operación
2. **Intermedio**: Agrega una operación de potencia
3. **Avanzado**: Agrega validación de números negativos

## 🔄 Siguiente Paso

Una vez que domines esta calculadora básica, estarás listo para:

- **Servidor inicial** (días 3-4) con más herramientas
- **Simulador web** para testing visual
- **Arquitectura más robusta**

## 📝 Notas Pedagógicas

- **Foco en claridad** sobre eficiencia
- **Comentarios abundantes** en el código
- **Un concepto por vez**
- **Ejemplos concretos**

¡Recuerda: Este es tu primer paso en el mundo MCP! 🎉
