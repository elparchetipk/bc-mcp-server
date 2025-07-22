#!/bin/bash

# Crear estructura completa de Claude AI
# Basada en la organización por días ya establecida

echo "📁 Creando estructura completa de Claude AI..."

cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server/claude-ai

# Definir estructura de módulos y días (basada en la estructura existente)
declare -A MODULES=(
    ["modulo-01"]="dias-1-2 dias-3-4 dias-5-7"
    ["modulo-02"]="dias-8-10 dias-11-13 dias-14"
    ["modulo-03"]="dias-15-17 dias-18-21"
    ["modulo-04"]="dias-22-24 dias-25-28"
    ["modulo-05"]="dias-29-31 dias-32-35"
    ["modulo-06"]="dias-36-38 dias-39-42"
    ["modulo-07"]="dias-43-45 dias-46-47 dias-48-49"
)

# Crear estructura completa
for modulo in "${!MODULES[@]}"; do
    echo "📂 Creando $modulo..."

    # Crear directorios principales
    for categoria in conversaciones documentos codigo artefactos recursos; do
        mkdir -p "$categoria/$modulo"

        # Crear subdirectorios por días
        for dias in ${MODULES[$modulo]}; do
            mkdir -p "$categoria/$modulo/$dias"

            # Crear README con instrucciones específicas
            cat > "$categoria/$modulo/$dias/README.md" << EOF
# $modulo - $dias

**Categoría**: $(echo $categoria | tr '[:lower:]' '[:upper:]')
**Módulo**: $modulo
**Período**: $dias

## Contenido

Aquí va todo el contenido de Claude AI relacionado con $dias del $modulo:

$(case $categoria in
  "conversaciones")
    echo "- Conversaciones completas exportadas de Claude AI"
    echo "- Transcripts de las sesiones de desarrollo"
    echo "- Preguntas y respuestas relevantes"
    echo "- Iteraciones y refinamientos"
    ;;
  "documentos")
    echo "- Documentación técnica generada"
    echo "- Especificaciones y requerimientos"
    echo "- Guías y tutoriales"
    echo "- Notas de diseño y arquitectura"
    ;;
  "codigo")
    echo "- Código fuente desarrollado en Claude AI"
    echo "- Ejemplos y prototipos"
    echo "- Scripts y herramientas"
    echo "- Configuraciones y templates"
    ;;
  "artefactos")
    echo "- Diagramas y esquemas generados"
    echo "- Mockups y wireframes"
    echo "- Assets y recursos gráficos"
    echo "- Plantillas y templates"
    ;;
  "recursos")
    echo "- Referencias y enlaces"
    echo "- Investigación y benchmarks"
    echo "- Inspiración y casos de estudio"
    echo "- Material complementario"
    ;;
esac)

## Organización Sugerida

\`\`\`
$dias/
├── $(date +%Y-%m-%d)_session-01/
├── $(date +%Y-%m-%d)_session-02/
└── [más sesiones...]
\`\`\`

## Notas

- Este directorio es **local** y no tiene trazabilidad en git
- Contenido base para desarrollo del bootcamp
- Referencia y punto de partida, no camisa de fuerza
- Mantener organización cronológica cuando sea posible
EOF
        done
    done
done

echo "✅ Estructura de Claude AI creada exitosamente"
