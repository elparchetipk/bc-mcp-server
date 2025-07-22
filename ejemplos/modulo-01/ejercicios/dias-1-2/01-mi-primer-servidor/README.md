# Ejercicio 1: Mi Primer Servidor MCP

**Dificultad**: 🟢 Principiante **Tiempo estimado**: 30-45 minutos **Objetivos**: Crear tu primer
servidor MCP desde cero

## 🎯 Lo que aprenderás

- Estructura básica de un servidor MCP
- Cómo definir una herramienta simple
- Comunicación entre cliente y servidor
- Manejo básico de errores

## 📋 Requisitos previos

- Node.js 18+ instalado
- Comprensión básica de TypeScript
- Haber revisado la calculadora básica

## 🚀 Instrucciones

### Paso 1: Analizar el código base

Revisa el archivo `server-esqueleto.ts`. Este archivo contiene:

- ✅ Estructura básica del servidor
- ❌ Herramienta incompleta que debes implementar
- ❌ Manejo de errores sin terminar

### Paso 2: Implementar la herramienta "saludar"

Tu misión es completar una herramienta que:

1. **Recibe** un nombre como parámetro
2. **Valida** que el nombre no esté vacío
3. **Retorna** un saludo personalizado
4. **Maneja errores** apropiadamente

### Paso 3: Probar tu servidor

```bash
# Compilar el código
pnpm build

# Ejecutar el servidor
pnpm start

# En otra terminal, probar con el cliente
node ../../servidor-inicial/test-client.js
```

## 🎯 Criterios de éxito

Tu servidor debe:

- ✅ **Compilar sin errores**
- ✅ **Responder a list_tools** con la herramienta "saludar"
- ✅ **Ejecutar la herramienta** con parámetros válidos
- ✅ **Manejar errores** cuando el nombre está vacío
- ✅ **Mostrar logs** informativos en la consola

## 🧪 Casos de prueba

1. **Caso válido**: `{"nombre": "Ana"}` → `"¡Hola Ana! Bienvenida al mundo MCP"`
2. **Nombre vacío**: `{"nombre": ""}` → Error con mensaje explicativo
3. **Sin parámetros**: `{}` → Error de validación
4. **Tipo incorrecto**: `{"nombre": 123}` → Error de tipo

## 💡 Pistas

<details>
<summary>Click para ver las pistas (solo si te atascas)</summary>

### Pista 1: Validación de entrada

```typescript
if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
  throw new Error('El nombre debe ser un texto no vacío');
}
```

### Pista 2: Estructura del resultado

```typescript
return {
  content: [
    {
      type: 'text',
      text: `¡Hola ${nombre.trim()}! Bienvenida/o al mundo MCP`,
    },
  ],
};
```

### Pista 3: Manejo de errores

```typescript
catch (error) {
  return {
    content: [{
      type: 'text',
      text: `Error: ${error.message}`
    }],
    isError: true
  };
}
```

</details>

## 🔄 Siguiente paso

Una vez que completes este ejercicio exitosamente:

1. **Experimenta** cambiando el mensaje de saludo
2. **Agrega logs** adicionales para debug
3. **Prueba casos edge** (nombres muy largos, caracteres especiales)
4. **Avanza** al ejercicio 02-herramientas-basicas

## 📚 Recursos adicionales

- [Documentación MCP](https://modelcontextprotocol.io)
- [SDK de TypeScript](https://github.com/modelcontextprotocol/typescript-sdk)
- Calculadora básica en `../../calculadora-basica/`

¡Mucho éxito! 🚀
