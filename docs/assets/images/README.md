# 🎨 Guía de Imágenes SVG - MCP Server Bootcamp

Este documento describe la organización y tipos de imágenes SVG recomendadas para cada módulo del
bootcamp.

## 📁 Estructura de Directorios

```
docs/assets/images/
├── modulos/           # Imágenes específicas por módulo
├── conceptos/         # Diagramas conceptuales generales
└── proyectos/         # Imágenes de proyectos finales
```

## 🎯 Imágenes Sugeridas por Módulo

### Módulo 1: Fundamentos (`modulos/modulo-01/`)

**Conceptos clave a visualizar:**

- **`arquitectura-mcp.svg`** - Diagrama general del protocolo MCP
- **`flujo-comunicacion.svg`** - Flujo request/response entre cliente y servidor
- **`estructura-herramientas.svg`** - Anatomía de una herramienta MCP
- **`conceptos-basicos.svg`** - Tools, Resources, Prompts en contexto
- **`primer-servidor.svg`** - Diagrama paso a paso del primer servidor

**Estilo recomendado:**

- Colores: Azules y verdes (confianza, aprendizaje)
- Iconografía simple y clara
- Flechas direccionales prominentes
- Texto grande y legible

### Módulo 2: Herramientas Avanzadas (`modulos/modulo-02/`)

**Conceptos clave a visualizar:**

- **`recursos-dinamicos.svg`** - Cómo se generan recursos en tiempo real
- **`prompts-contextuales.svg`** - Sistema de prompts con contexto
- **`integracion-apis.svg`** - Conexión con APIs externas
- **`middleware-pattern.svg`** - Patrón de middleware en MCP
- **`error-handling.svg`** - Flujo de manejo de errores

**Estilo recomendado:**

- Colores: Naranjas y amarillos (dinamismo, energía)
- Elementos interconectados
- Representación de flujos de datos
- Componentes modulares

### Módulo 3: Persistencia (`modulos/modulo-03/`)

**Conceptos clave a visualizar:**

- **`arquitectura-db.svg`** - Stack de persistencia completo
- **`prisma-workflow.svg`** - Flujo de trabajo con Prisma ORM
- **`transacciones.svg`** - Manejo de transacciones de BD
- **`migraciones.svg`** - Proceso de migraciones de esquema
- **`sqlite-vs-postgresql.svg`** - Comparación de motores de BD

**Estilo recomendado:**

- Colores: Púrpuras y azules oscuros (datos, solidez)
- Representación de tablas y relaciones
- Iconos de bases de datos
- Flujos de persistencia

### Módulo 4: Seguridad (`modulos/modulo-04/`)

**Conceptos clave a visualizar:**

- **`auth-flow.svg`** - Flujo completo de autenticación
- **`rbac-structure.svg`** - Estructura de roles y permisos
- **`security-layers.svg`** - Capas de seguridad del sistema
- **`jwt-lifecycle.svg`** - Ciclo de vida de tokens JWT
- **`audit-logging.svg`** - Sistema de auditoría y logs

**Estilo recomendado:**

- Colores: Rojos y grises (seguridad, seriedad)
- Iconos de candados y escudos
- Capas visuales claras
- Elementos de validación

### Módulo 5: Testing (`modulos/modulo-05/`)

**Conceptos clave a visualizar:**

- **`testing-pyramid.svg`** - Pirámide de testing (unit, integration, e2e)
- **`ci-cd-pipeline.svg`** - Pipeline completo de CI/CD
- **`coverage-strategy.svg`** - Estrategia de cobertura de código
- **`mocking-patterns.svg`** - Patrones de mocking para MCP
- **`test-environments.svg`** - Entornos de testing

**Estilo recomendado:**

- Colores: Verdes y azules (confiabilidad, calidad)
- Elementos de verificación (checkmarks)
- Representación de pipelines
- Métricas visuales

### Módulo 6: Arquitecturas Avanzadas (`modulos/modulo-06/`)

**Conceptos clave a visualizar:**

- **`microservicios.svg`** - Arquitectura de microservicios
- **`deployment-strategies.svg`** - Estrategias de deployment
- **`monitoring-stack.svg`** - Stack de monitoreo completo
- **`scaling-patterns.svg`** - Patrones de escalabilidad
- **`resilience-patterns.svg`** - Patrones de resistencia

**Estilo recomendado:**

- Colores: Azules y plateados (tecnología, sofisticación)
- Componentes distribuidos
- Conexiones de red
- Métricas y dashboards

### Módulo 7: Proyecto Final (`modulos/modulo-07/`)

**Conceptos clave a visualizar:**

- **`arquitectura-completa.svg`** - Arquitectura end-to-end
- **`tech-stack.svg`** - Stack tecnológico completo
- **`deployment-flow.svg`** - Flujo de deployment a producción
- **`user-journey.svg`** - Journey del usuario final
- **`performance-optimization.svg`** - Optimizaciones aplicadas

**Estilo recomendado:**

- Colores: Gradientes dorados (logro, culminación)
- Vista panorámica del sistema
- Elementos de producción
- Indicadores de éxito

## 🌐 Imágenes Conceptuales Generales (`conceptos/`)

**Imágenes transversales:**

- **`mcp-protocol-overview.svg`** - Visión general del protocolo MCP
- **`bootcamp-roadmap.svg`** - Roadmap visual del bootcamp
- **`stack-tecnologico.svg`** - Stack tecnológico utilizado
- **`learning-path.svg`** - Camino de aprendizaje progresivo
- **`best-practices.svg`** - Mejores prácticas visualizadas

## 🏗️ Imágenes de Proyectos (`proyectos/`)

**Por cada proyecto final:**

```
proyectos/
├── ecommerce/
│   ├── arquitectura.svg
│   ├── flujo-usuario.svg
│   └── componentes.svg
├── fintech/
│   ├── arquitectura.svg
│   ├── security-model.svg
│   └── transaction-flow.svg
└── healthcare/
    ├── arquitectura.svg
    ├── data-privacy.svg
    └── integration-points.svg
```

## 🎨 Guías de Diseño

### Estilo Visual Consistente

**Paleta de colores base:**

```css
/* Colores primarios del bootcamp */
--primary-blue: #2563eb --primary-purple: #7c3aed --success-green: #16a34a --warning-orange: #ea580c
  --error-red: #dc2626 /* Colores neutros */ --gray-100: #f3f4f6 --gray-500: #6b7280
  --gray-900: #111827;
```

**Tipografía:**

- Fuente principal: Inter, system-ui, sans-serif
- Tamaños: Título (18px), Subtítulo (14px), Texto (12px)
- Peso: Regular (400), Medio (500), Bold (700)

**Iconografía:**

- Estilo: Line icons, outline
- Grosor: 2px stroke
- Tamaño base: 24px
- Librería recomendada: Heroicons, Lucide

### Principios de Diseño

1. **Claridad** - Cada elemento debe tener un propósito claro
2. **Consistencia** - Usar los mismos elementos en todo el bootcamp
3. **Progresión** - Complejidad visual que crece con los módulos
4. **Accesibilidad** - Contraste suficiente, tamaños legibles
5. **Responsividad** - SVGs que escalen bien en diferentes tamaños

### Elementos Recurrentes

**Componentes estándar:**

- Servidor MCP: Rectángulo redondeado azul
- Base de datos: Cilindro púrpura
- Cliente/Usuario: Círculo con ícono de persona
- API externa: Hexágono naranja
- Red/Internet: Nube gris

**Conectores:**

- Comunicación bidireccional: Flecha doble
- Request: Flecha sólida azul
- Response: Flecha punteada verde
- Error: Flecha roja con zigzag

## 📝 Convenciones de Nomenclatura

### Archivos

```
# Formato: concepto-especifico.svg
arquitectura-mcp.svg          # ✅ Correcto
flujo-comunicacion.svg        # ✅ Correcto
MCP_Architecture.svg          # ❌ Evitar mayúsculas y underscores
flujo comunicacion.svg        # ❌ Evitar espacios
```

### IDs y clases en SVG

```svg
<!-- Usar nombres descriptivos -->
<g id="servidor-mcp" class="componente-principal">
<rect id="base-datos" class="storage-element">
<path id="flujo-request" class="communication-line">
```

## 🔗 Integración en Documentación

### Markdown

```markdown
<!-- Imagen centrada con título -->
<div align="center">
  <img src="../assets/images/modulos/modulo-01/arquitectura-mcp.svg"
       alt="Arquitectura del Protocolo MCP"
       width="600"/>
  <p><em>Figura 1.1: Arquitectura general del protocolo MCP</em></p>
</div>

<!-- Imagen inline -->

![Flujo de comunicación](../assets/images/modulos/modulo-01/flujo-comunicacion.svg)
```

### HTML (para más control)

```html
<figure>
  <img
    src="../assets/images/modulos/modulo-01/arquitectura-mcp.svg"
    alt="Arquitectura MCP"
    style="max-width: 100%; height: auto;"
  />
  <figcaption><strong>Figura 1.1:</strong> Arquitectura general del protocolo MCP</figcaption>
</figure>
```

## ✅ Checklist de Calidad

Antes de agregar cualquier SVG, verificar:

- [ ] **Tamaño**: Optimizado (< 50KB por archivo)
- [ ] **Accesibilidad**: Alt text descriptivo incluido
- [ ] **Responsive**: Escala correctamente 300px - 1200px
- [ ] **Consistencia**: Sigue la paleta de colores definida
- [ ] **Semántica**: Nombres de archivo descriptivos
- [ ] **Optimización**: Minificado (usar SVGO)
- [ ] **Licencia**: Compatible con licencia del proyecto

## 🛠️ Herramientas Recomendadas

**Creación:**

- Figma (diseño colaborativo)
- Adobe Illustrator (profesional)
- Inkscape (open source)
- Draw.io (diagramas)

**Optimización:**

- SVGO (optimizador)
- SVG-Editor (online)
- ImageOptim (batch processing)

**Validación:**

- SVG Validator (W3C)
- Accessibility checker
- Performance audit

---

**💡 Nota**: Esta guía evoluciona con el bootcamp. Mantén consistencia con el estilo establecido y
documenta cualquier nueva convención.
