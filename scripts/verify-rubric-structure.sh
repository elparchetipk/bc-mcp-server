#!/bin/bash

# Script de verificación de estructura de rúbricas
# Bootcamp MCP Server

echo "🔍 VERIFICACIÓN DE ESTRUCTURA DE RÚBRICAS"
echo "========================================="
echo ""

cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server

echo "📁 ESTRUCTURA COMPLETA DE RÚBRICAS:"
echo "===================================="

for modulo in docs/evaluaciones/rubricas/modulo-*; do
    if [ -d "$modulo" ]; then
        modulo_name=$(basename "$modulo")
        echo ""
        echo "📂 $modulo_name:"

        dias_count=0
        for dias in "$modulo"/dias-*; do
            if [ -d "$dias" ]; then
                dias_name=$(basename "$dias")
                dias_count=$((dias_count + 1))
                echo "   ✅ $dias_name/"

                # Verificar archivos en el directorio
                files_count=$(find "$dias" -maxdepth 1 -type f | wc -l)
                if [ $files_count -gt 0 ]; then
                    echo "      📄 $files_count archivo(s) preparado(s)"
                else
                    echo "      📝 Listo para recibir rúbricas"
                fi
            fi
        done

        if [ $dias_count -eq 0 ]; then
            echo "   ⚠️ Sin períodos de días configurados"
        fi
    fi
done

echo ""
echo "🎯 RESUMEN FINAL:"
echo "================="

total_modules=$(find docs/evaluaciones/rubricas -maxdepth 1 -name "modulo-*" -type d | wc -l)
total_periods=$(find docs/evaluaciones/rubricas -name "dias-*" -type d | wc -l)

echo "📊 Módulos configurados: $total_modules"
echo "📅 Períodos de días creados: $total_periods"
echo ""

echo "✅ ESTRUCTURA LISTA PARA:"
echo "========================"
echo "1. 📤 Subir tus rúbricas existentes"
echo "2. 🔍 Validación de contenido"
echo "3. 📝 Integración con documentación"
echo "4. 🚀 Implementación en el bootcamp"
echo ""

echo "🎉 ¡Estructura de rúbricas completada exitosamente!"
