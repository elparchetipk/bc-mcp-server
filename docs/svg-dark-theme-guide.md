# Guía de Mantenimiento - SVGs Tema Dark

## Bootcamp MCP Server

### Estándares para Nuevos SVGs

Al crear nuevos recursos gráficos para el bootcamp, seguir estas especificaciones:

#### 1. Paleta de Colores Obligatoria

```xml
<!-- Fondo principal -->
<rect width="100%" height="100%" fill="#0f172a"/>

<!-- Texto principal -->
<text fill="#f8fafc" font-family="Inter, system-ui, sans-serif">

<!-- Texto secundario -->
<text fill="#64748b" font-family="Inter, system-ui, sans-serif">

<!-- Bordes y separadores -->
<rect stroke="#475569" stroke-width="1"/>
```

#### 2. Colores Semánticos por Categoría

```xml
<!-- Conceptos fundamentales (Azul) -->
<rect fill="#1e40af" stroke="#3b82f6"/>

<!-- Alertas y errores (Rojo) -->
<rect fill="#7c2d12" stroke="#dc2626"/>

<!-- Éxito y confirmación (Verde) -->
<rect fill="#064e3b" stroke="#10b981"/>

<!-- Advertencias (Amber) -->
<rect fill="#92400e" stroke="#f59e0b"/>

<!-- Conceptos avanzados (Violeta) -->
<rect fill="#581c87" stroke="#7c3aed"/>
```

#### 3. Tipografía Estándar

```xml
<!-- Títulos principales -->
<text font-family="Inter, system-ui, sans-serif"
      font-size="24"
      font-weight="bold"
      fill="#f8fafc">

<!-- Subtítulos -->
<text font-family="Inter, system-ui, sans-serif"
      font-size="18"
      font-weight="600"
      fill="#f8fafc">

<!-- Texto regular -->
<text font-family="Inter, system-ui, sans-serif"
      font-size="14"
      font-weight="400"
      fill="#64748b">
```

### Proceso de Validación

#### Antes de Commit

1. **Verificar sintaxis XML**:

   ```bash
   xmllint --noout tu-archivo.svg
   ```

2. **Confirmar paleta dark**:

   ```bash
   grep "#0f172a" tu-archivo.svg  # Debe aparecer como fondo
   ```

3. **Verificar tipografía**:
   ```bash
   grep "Inter" tu-archivo.svg    # Debe usar Inter
   ```

#### Scripts de Validación Automática

```bash
# Validar un SVG específico
./scripts/validate-single-svg.sh path/to/file.svg

# Validar todos los SVGs del proyecto
./scripts/validate-svg-conversion.sh

# Convertir SVG existente a dark theme
./scripts/convert-single-svg.sh path/to/file.svg
```

### Organización por Módulos

```
docs/assets/images/modulos/
├── modulo-01-fundamentos/
│   ├── dias-1-2/          # Conceptos básicos
│   ├── dias-3-4/          # Herramientas principales
│   └── dias-5-7/          # Anatomía y arquitectura
├── modulo-02-herramientas-avanzadas/
│   ├── dias-8-10/         # Recursos dinámicos
│   ├── dias-11-13/        # APIs y prompts
│   └── dias-14/           # Integración completa
└── [otros módulos...]
```

### Nomenclatura de Archivos

```
[concepto]_[tipo]_[variante].svg

Ejemplos:
- mcp_architecture_overview.svg
- database_connection_flow.svg
- security_layers_diagram.svg
- testing_strategy_pyramid.svg
```

### Checklist para Nuevos SVGs

- [ ] ✅ Fondo `#0f172a` aplicado
- [ ] ✅ Tipografía Inter configurada
- [ ] ✅ Colores semánticos correctos
- [ ] ✅ Alto contraste (WCAG AAA)
- [ ] ✅ Sintaxis XML válida
- [ ] ✅ Tamaño optimizado (< 50KB)
- [ ] ✅ Escalabilidad vectorial preservada
- [ ] ✅ Compatible con tema dark de VS Code

### Herramientas Recomendadas

#### Para Creación

- **Figma**: Diseño colaborativo con paleta dark predefinida
- **Inkscape**: Editor SVG open source
- **Adobe Illustrator**: Para diseños complejos

#### Para Validación

- **xmllint**: Validación sintáctica XML
- **svgo**: Optimización de SVGs
- **VS Code SVG Viewer**: Preview en el entorno real

### Problemas Comunes y Soluciones

#### 1. Texto Invisible

```xml
<!-- ❌ Problemático -->
<text fill="#0f172a">Texto invisible</text>

<!-- ✅ Correcto -->
<text fill="#f8fafc">Texto visible</text>
```

#### 2. Gradientes No Accesibles

```xml
<!-- ❌ Evitar gradientes complejos -->
<defs>
  <linearGradient id="complex">...</linearGradient>
</defs>

<!-- ✅ Usar colores sólidos -->
<rect fill="#1e40af"/>
```

#### 3. Bordes de Bajo Contraste

```xml
<!-- ❌ Borde poco visible -->
<rect stroke="#2a2a2a" stroke-width="1"/>

<!-- ✅ Borde con contraste -->
<rect stroke="#475569" stroke-width="1"/>
```

### Integración en Documentación

```markdown
<!-- En archivos README.md -->

![Arquitectura MCP](../assets/images/modulos/modulo-01/dias-1-2/mcp_architecture_overview.svg)

<!-- Con alt text descriptivo -->

![Flujo de inicialización del servidor MCP mostrando las fases de configuración, registro de herramientas y establecimiento de transporte](../assets/images/modulos/modulo-01/dias-5-7/mcp_initialization_flow.svg)
```

### Mantenimiento Continuo

#### Revisión Trimestral

- Verificar coherencia visual entre módulos
- Actualizar paleta si es necesario
- Optimizar SVGs para mejor rendimiento
- Revisar accesibilidad y contraste

#### Metrics de Calidad

- **Consistencia visual**: 100% adherencia a paleta
- **Accesibilidad**: WCAG AAA compliance
- **Performance**: < 50KB por SVG
- **Validación**: 0 errores XML

---

**Mantenido por**: Equipo de Desarrollo Bootcamp MCP Server **Última actualización**: 22 de julio de
2025 **Próxima revisión**: 22 de octubre de 2025
