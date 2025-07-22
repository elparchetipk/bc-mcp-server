#!/bin/bash

# Monitor de progreso para la conversión de SVGs

BASE_DIR="/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server/docs/assets/images/modulos"

while true; do
    clear
    echo "🌙 Monitor de Conversión SVG - Tema Dark"
    echo "========================================"
    echo ""

    total_svgs=$(find "$BASE_DIR" -name "*.svg" | wc -l)
    converted_svgs=$(find "$BASE_DIR" -name "*.svg" -exec grep -l "#0f172a" {} \; 2>/dev/null | wc -l)
    remaining=$((total_svgs - converted_svgs))

    echo "📊 Estado General:"
    echo "  Total de SVGs: $total_svgs"
    echo "  Convertidos: $converted_svgs"
    echo "  Pendientes: $remaining"
    echo "  Progreso: $(( converted_svgs * 100 / total_svgs ))%"
    echo ""

    echo "📁 Estado por Módulo:"
    for modulo in $(find "$BASE_DIR" -mindepth 1 -maxdepth 1 -type d | sort); do
        modulo_name=$(basename "$modulo")
        svg_count=$(find "$modulo" -name "*.svg" | wc -l)
        converted_count=$(find "$modulo" -name "*.svg" -exec grep -l "#0f172a" {} \; 2>/dev/null | wc -l)

        if [ $converted_count -eq $svg_count ]; then
            status="✅"
        elif [ $converted_count -gt 0 ]; then
            status="🔄"
        else
            status="⏳"
        fi

        echo "  $status $modulo_name: $converted_count/$svg_count"
    done

    echo ""
    echo "🔄 Actualizando en 3 segundos... (Ctrl+C para salir)"

    if [ $remaining -eq 0 ]; then
        echo ""
        echo "🎉 ¡Conversión completada! Todos los SVGs han sido convertidos."
        break
    fi

    sleep 3
done
