# 🌙 Guía de Conversión a Tema Dark - SVG Bootcamp MCP

Esta guía te ayudará a convertir todas las imágenes SVG del bootcamp a tema dark sin degradados,
manteniendo consistencia visual y legibilidad.

## 🎨 Paleta de Colores Dark Mode

### Colores de Fondo

```css
/* Fondo principal */
--bg-primary: #0f172a /* slate-900 - Fondo principal dark */ --bg-secondary: #1e293b
  /* slate-800 - Elementos secundarios */ --bg-tertiary: #334155
  /* slate-700 - Elementos terciarios */;
```

### Colores de Componentes Principales

```css
/* Cliente MCP (Azul) */
--client-bg: #3b82f6 /* blue-500 - Sin degradados */ --client-border: #60a5fa
  /* blue-400 - Borde más claro */ --client-stroke: #60a5fa /* blue-400 - Para flechas/conexiones */
  /* Servidor MCP (Verde) */ --server-bg: #16a34a /* green-600 - Sin degradados */
  --server-border: #4ade80 /* green-400 - Borde más claro */ --server-stroke: #4ade80
  /* green-400 - Para flechas/conexiones */ /* Protocolo MCP (Rojo) */ --protocol-bg: #dc2626
  /* red-600 - Sin degradados */ --protocol-border: #f87171 /* red-400 - Borde más claro */
  --protocol-stroke: #f87171 /* red-400 - Para conexiones */;
```

### Colores de Herramientas MCP

```css
/* Tools (Amarillo/Naranja) */
--tools-bg: #f59e0b /* amber-500 - Sin degradados */ --tools-border: #fbbf24
  /* amber-400 - Borde más claro */ --tools-text: #0f172a /* Texto dark sobre fondo claro */
  /* Resources (Púrpura) */ --resources-bg: #8b5cf6 /* violet-500 - Sin degradados */
  --resources-border: #a78bfa /* violet-400 - Borde más claro */ --resources-text: #f8fafc
  /* Texto light sobre fondo oscuro */ /* Prompts (Rosa) */ --prompts-bg: #ec4899
  /* pink-500 - Sin degradados */ --prompts-border: #f472b6 /* pink-400 - Borde más claro */
  --prompts-text: #f8fafc /* Texto light sobre fondo oscuro */;
```

### Colores de Servicios Externos

```css
/* Servicios externos (Gris) */
--external-bg: #475569 /* slate-600 - Sin degradados */ --external-border: #64748b
  /* slate-500 - Borde más claro */ --external-text: #f8fafc /* Texto light */;
```

### Colores de Texto

```css
/* Textos principales */
--text-primary: #f8fafc /* slate-50 - Títulos principales */ --text-secondary: #e2e8f0
  /* slate-200 - Subtítulos */ --text-tertiary: #cbd5e1 /* slate-300 - Texto descriptivo */
  --text-muted: #94a3b8 /* slate-400 - Texto secundario */ /* Textos sobre fondos claros */
  --text-on-light: #0f172a /* slate-900 - Para fondos amarillos */ --text-on-light-alt: #1e293b
  /* slate-800 - Alternativa */;
```

### Colores de Líneas y Bordes

```css
/* Líneas y flechas */
--line-primary: #64748b /* slate-500 - Líneas generales */ --line-client: #60a5fa
  /* blue-400 - Líneas del cliente */ --line-server: #4ade80 /* green-400 - Líneas del servidor */
  --line-protocol: #f87171 /* red-400 - Líneas del protocolo */ /* Bordes */ --border-width: 2px
  /* Grosor estándar de bordes */ --stroke-width-thin: 2px /* Líneas delgadas */
  --stroke-width-thick: 3px /* Líneas gruesas (comunicación principal) */;
```

## 🔧 Transformaciones Requeridas

### 1. Eliminar Todos los Degradados

```xml
<!-- ❌ ANTES: Con degradados -->
<defs>
  <linearGradient id="clientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
  </linearGradient>
</defs>
<rect fill="url(#clientGradient)" />

<!-- ✅ DESPUÉS: Color sólido -->
<rect fill="#3b82f6" stroke="#60a5fa" stroke-width="2" />
```

### 2. Agregar Fondo Dark

```xml
<!-- Agregar al inicio del SVG, después del viewBox -->
<rect width="800" height="600" fill="#0f172a"/>
```

### 3. Actualizar Tipografía

```xml
<!-- ❌ ANTES: Arial y colores claros -->
<text fill="white" font-family="Arial, sans-serif">

<!-- ✅ DESPUÉS: Inter y paleta dark -->
<text fill="#f8fafc" font-family="Inter, system-ui, sans-serif">
```

### 4. Agregar Bordes de Contraste

```xml
<!-- ❌ ANTES: Solo relleno -->
<rect fill="#3b82f6" />

<!-- ✅ DESPUÉS: Con borde para contraste -->
<rect fill="#3b82f6" stroke="#60a5fa" stroke-width="2" />
```

## 📋 Checklist de Conversión

Para cada SVG, verificar:

### Estructura Base

- [ ] **Fondo dark** agregado (`#0f172a`)
- [ ] **ViewBox** mantenido sin cambios
- [ ] **Dimensiones** preservadas

### Eliminación de Degradados

- [ ] **Todos los `<linearGradient>`** eliminados de `<defs>`
- [ ] **Todos los `url(#gradient)`** reemplazados por colores sólidos
- [ ] **No hay `<radialGradient>`** o degradados radiales

### Colores Actualizados

- [ ] **Componentes principales** usan la paleta definida
- [ ] **Bordes añadidos** para contraste (`stroke` + `stroke-width`)
- [ ] **Textos** usan colores de la paleta dark
- [ ] **Líneas y flechas** actualizadas a colores apropiados

### Tipografía

- [ ] **Font-family** cambiado a `Inter, system-ui, sans-serif`
- [ ] **Colores de texto** apropiados para tema dark
- [ ] **Contraste suficiente** en todos los textos

### Elementos Específicos MCP

- [ ] **Cliente MCP**: Azul sólido (`#3b82f6`) con borde (`#60a5fa`)
- [ ] **Servidor MCP**: Verde sólido (`#16a34a`) con borde (`#4ade80`)
- [ ] **Protocolo MCP**: Rojo sólido (`#dc2626`) con borde (`#f87171`)
- [ ] **Tools**: Amarillo (`#f59e0b`) con texto dark (`#0f172a`)
- [ ] **Resources**: Púrpura (`#8b5cf6`) con texto light (`#f8fafc`)
- [ ] **Prompts**: Rosa (`#ec4899`) con texto light (`#f8fafc`)

## 🛠️ Script de Conversión Automática

Para conversiones rápidas, puedes usar este patrón de búsqueda y reemplazo:

### Reemplazos Globales

```bash
# Eliminar definiciones de degradados
sed -i '/<linearGradient/,/<\/linearGradient>/d' archivo.svg
sed -i '/<radialGradient/,/<\/radialGradient>/d' archivo.svg

# Cambiar font-family
sed -i 's/font-family="Arial, sans-serif"/font-family="Inter, system-ui, sans-serif"/g' archivo.svg

# Actualizar colores comunes
sed -i 's/fill="white"/fill="#f8fafc"/g' archivo.svg
sed -i 's/fill="#1F2937"/fill="#f8fafc"/g' archivo.svg
sed -i 's/fill="#374151"/fill="#cbd5e1"/g' archivo.svg
```

### Reemplazos Específicos por Componente

```bash
# Cliente MCP
sed -i 's/url(#clientGradient)/#3b82f6" stroke="#60a5fa" stroke-width="2/g' archivo.svg

# Servidor MCP
sed -i 's/url(#serverGradient)/#16a34a" stroke="#4ade80" stroke-width="2/g' archivo.svg

# Protocolo MCP
sed -i 's/url(#protocolGradient)/#dc2626" stroke="#f87171" stroke-width="2/g' archivo.svg
```

## 🎯 Ejemplos de Conversión

### Antes vs Después

#### Cliente MCP

```xml
<!-- ❌ ANTES -->
<rect fill="url(#clientGradient)" />
<text fill="white" font-family="Arial, sans-serif">Cliente MCP</text>

<!-- ✅ DESPUÉS -->
<rect fill="#3b82f6" stroke="#60a5fa" stroke-width="2" />
<text fill="#f8fafc" font-family="Inter, system-ui, sans-serif">Cliente MCP</text>
```

#### Herramientas (Tools)

```xml
<!-- ❌ ANTES -->
<rect fill="#F59E0B" />
<text fill="white" font-family="Arial, sans-serif">Tools</text>

<!-- ✅ DESPUÉS -->
<rect fill="#f59e0b" stroke="#fbbf24" stroke-width="2" />
<text fill="#0f172a" font-family="Inter, system-ui, sans-serif">Tools</text>
```

## 🔍 Validación Final

### Contraste y Accesibilidad

1. **Usar herramientas de contraste** para verificar legibilidad
2. **Probar en diferentes tamaños** (300px - 1200px)
3. **Verificar en modo dark** del sistema operativo

### Consistencia Visual

1. **Comparar con el SVG ya convertido** (`mcp_architecture_overview.svg`)
2. **Mantener proporciones** y espaciado
3. **Usar la misma paleta** en todos los archivos

### Rendimiento

1. **Optimizar con SVGO** después de la conversión
2. **Mantener tamaño < 50KB** por archivo
3. **Eliminar elementos innecesarios**

## 📝 Convenciones de Nomenclatura

### Archivos Convertidos

- Mantener nombres originales
- Agregar sufijo `-dark` solo si necesitas mantener ambas versiones
- Ejemplo: `arquitectura-mcp-dark.svg` (temporal)

### Comentarios en SVG

```xml
<!-- Sección - Tema Dark -->
<g id="cliente-mcp">
  <!-- Cliente MCP - Tema Dark -->
  <rect fill="#3b82f6" stroke="#60a5fa" stroke-width="2" />
</g>
```

---

**💡 Tip**: Usa esta guía como referencia y adapta los colores según el contexto específico de cada
diagrama, siempre manteniendo la coherencia con la paleta base.
