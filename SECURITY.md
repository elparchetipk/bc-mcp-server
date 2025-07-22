# Política de Seguridad del MCP Server Bootcamp

La seguridad es una prioridad en el bootcamp, no solo en el contenido que enseñamos, sino también en el propio proyecto. Agradecemos enormemente a los investigadores de seguridad y a los miembros de la comunidad que dedican tiempo a encontrar y reportar vulnerabilidades de manera responsable.

## Versiones Soportadas

Este proyecto sigue un modelo de lanzamiento continuo. Solo la última versión disponible en la rama `main` recibe actualizaciones de seguridad.

| Versión | Soportada          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |
| < 1.0   | :x:                |

## Cómo Reportar una Vulnerabilidad

**POR FAVOR, NO DIVULGUE VULNERABILIDADES DE SEGURIDAD PÚBLICAMENTE.**

Si descubre un problema de seguridad, le pedimos que nos lo notifique de forma privada para darnos la oportunidad de solucionarlo antes de que sea de conocimiento público.

Envíe un correo electrónico a **`security@bootcamp-mcp.com`** (reemplace con un correo real si está disponible) con todos los detalles.

**Por favor, incluya la siguiente información en su reporte:**

- **Tipo de vulnerabilidad:** (p. ej., Inyección de SQL, Cross-Site Scripting, Fuga de Credenciales, etc.)
- **Ubicación:** El archivo o los archivos afectados y la ubicación específica del código.
- **Descripción detallada:** Una descripción clara y concisa de la vulnerabilidad.
- **Pasos para reproducir:** Instrucciones paso a paso para que podamos replicar el problema.
- **Impacto:** ¿Cuál es el impacto potencial de esta vulnerabilidad?
- **Configuración:** Cualquier configuración específica del entorno necesaria para explotar la vulnerabilidad.

Nos comprometemos a responder a su informe en un plazo de 48 horas y a mantenerle informado del progreso de la solución.

## Alcance de la Política

Esta política se aplica al código y la infraestructura gestionados por el equipo del bootcamp, incluyendo:

- El código en los directorios `ejemplos/`, `plantillas/` y `herramientas/`.
- Los scripts de automatización en el directorio `scripts/`.
- La configuración de Docker y otros servicios.

No se consideran dentro del alcance las vulnerabilidades en las dependencias de terceros, las cuales deben ser reportadas directamente a los mantenedores de dichos proyectos.

## Prácticas de Seguridad para Estudiantes

Los ejemplos de código proporcionados en este bootcamp tienen fines educativos. Aunque nos esforzamos por seguir las mejores prácticas, es responsabilidad de cada estudiante:

1.  **Nunca usar credenciales reales** o datos sensibles en sus proyectos de práctica.
2.  **Entender los riesgos** asociados con cada pieza de código que escriben.
3.  **Aplicar validación de entradas, sanitización de salidas y otros controles de seguridad** en sus proyectos finales, tal como se enseña en el Módulo 4.

Este proyecto es un entorno de aprendizaje. ¡Ayúdanos a mantenerlo seguro para todos!
