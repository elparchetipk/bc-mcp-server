#!/bin/bash

# Script para conversión masiva de SVGs a tema dark
# Bootcamp MCP Server - Conversión de recursos gráficos

set -e

echo "🌙 Iniciando conversión masiva de SVGs a tema dark..."

# Directorio base de imágenes
BASE_DIR="/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server/docs/assets/images/modulos"

# Colores de reemplazo (tema dark)
declare -A COLORS=(
    ["#f8f9fa"]="#0f172a"        # Fondo claro → dark
    ["#ffffff"]="#0f172a"        # Fondo blanco → dark
    ["#2c3e50"]="#f8fafc"        # Texto oscuro → claro
    ["#34495e"]="#64748b"        # Elementos grises → slate
    ["#7f8c8d"]="#94a3b8"        # Texto gris → slate-400
    ["#95a5a6"]="#475569"        # Bordes grises → slate-600
    ["#bdc3c7"]="#475569"        # Bordes claros → slate-600
    ["#ecf0f1"]="#1e293b"        # Fondos claros → slate-800

    # Azules
    ["#3498db"]="#1e40af"        # Azul principal → blue-800
    ["#2980b9"]="#3b82f6"        # Azul oscuro → blue-500

    # Rojos
    ["#e74c3c"]="#7c2d12"        # Rojo principal → red-900
    ["#c0392b"]="#dc2626"        # Rojo oscuro → red-600

    # Verdes
    ["#2ecc71"]="#064e3b"        # Verde principal → emerald-900
    ["#27ae60"]="#10b981"        # Verde oscuro → emerald-500

    # Naranjas/Amber
    ["#f39c12"]="#92400e"        # Naranja → amber-800
    ["#e67e22"]="#f59e0b"        # Naranja oscuro → amber-500

    # Violetas
    ["#9b59b6"]="#581c87"        # Violeta → purple-900
    ["#8e44ad"]="#7c3aed"        # Violeta oscuro → violet-600
)

# Reemplazos de tipografía
FONT_REPLACE="s/Arial, sans-serif/Inter, system-ui, sans-serif/g"

# Función para procesar un archivo SVG
process_svg() {
    local file="$1"
    local backup="${file}.backup"

    echo "  📄 Procesando: $(basename "$file")"

    # Crear backup si no existe
    if [[ ! -f "$backup" ]]; then
        cp "$file" "$backup"
    fi

    # Aplicar reemplazos de color
    local temp_file=$(mktemp)
    cp "$file" "$temp_file"

    for old_color in "${!COLORS[@]}"; do
        new_color="${COLORS[$old_color]}"
        sed -i "s/$old_color/$new_color/g" "$temp_file"
    done

    # Aplicar cambio de tipografía
    sed -i "$FONT_REPLACE" "$temp_file"

    # Reemplazar caracteres especiales problemáticos
    sed -i 's/< /\&lt; /g' "$temp_file"
    sed -i 's/> /\&gt; /g' "$temp_file"

    # Mover archivo procesado
    mv "$temp_file" "$file"

    # Validar XML
    if xmllint --noout "$file" 2>/dev/null; then
        echo "    ✅ Convertido y validado"
    else
        echo "    ❌ Error de validación - restaurando backup"
        cp "$backup" "$file"
    fi
}

# Contador de archivos procesados
count=0
total=$(find "$BASE_DIR" -name "*.svg" | wc -l)

echo "📊 Total de archivos SVG encontrados: $total"
echo ""

# Procesar archivos por módulo
for modulo in $(find "$BASE_DIR" -mindepth 1 -maxdepth 1 -type d | sort); do
    modulo_name=$(basename "$modulo")
    echo "📁 Procesando $modulo_name..."

    # Buscar todos los SVGs en el módulo
    while IFS= read -r -d '' file; do
        # Verificar si ya está convertido (buscar fondo dark)
        if grep -q "#0f172a" "$file" 2>/dev/null; then
            echo "  ⏭️  Ya convertido: $(basename "$file")"
        else
            process_svg "$file"
            ((count++))
        fi
    done < <(find "$modulo" -name "*.svg" -print0)

    echo ""
done

echo "🎉 Conversión completada!"
echo "📊 Archivos procesados: $count de $total"
echo "💾 Backups creados en: *.svg.backup"

# Crear reporte de estado
cat > "/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server/conversion-report.md" << EOF
# Reporte de Conversión SVG a Tema Dark

**Fecha**: $(date)
**Total de archivos**: $total
**Archivos convertidos**: $count

## Estado por Módulo

$(find "$BASE_DIR" -mindepth 1 -maxdepth 1 -type d | sort | while read modulo; do
    modulo_name=$(basename "$modulo")
    svg_count=$(find "$modulo" -name "*.svg" | wc -l)
    converted_count=$(find "$modulo" -name "*.svg" -exec grep -l "#0f172a" {} \; 2>/dev/null | wc -l)
    echo "- **$modulo_name**: $converted_count/$svg_count convertidos"
done)

## Paleta de Colores Aplicada

- Fondo base: \`#0f172a\` (slate-900)
- Texto principal: \`#f8fafc\` (slate-50)
- Elementos neutros: \`#64748b\` (slate-500)
- Tipografía: Inter, system-ui, sans-serif

## Validación

Todos los SVGs han sido validados con xmllint.
Los backups están disponibles como \*.svg.backup

EOF

echo "📄 Reporte generado en: conversion-report.md"
