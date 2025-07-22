#!/bin/bash

# Verificar estructura de Claude AI
# Bootcamp MCP Server

echo "🔍 VERIFICACIÓN DE ESTRUCTURA CLAUDE AI"
echo "======================================="
echo ""

cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server

echo "📊 ANÁLISIS DE ESTRUCTURA:"
echo "=========================="
echo ""

# Verificar categorías principales
categorias=(conversaciones documentos codigo artefactos recursos)
echo "📁 Categorías principales:"
for categoria in "${categorias[@]}"; do
    if [ -d "claude-ai/$categoria" ]; then
        count=$(find "claude-ai/$categoria" -type d -name "dias-*" | wc -l)
        echo "   ✅ $categoria/ ($count períodos de días)"
    else
        echo "   ❌ $categoria/ (faltante)"
    fi
done

echo ""

# Verificar módulos
echo "📚 Módulos por categoría:"
for categoria in "${categorias[@]}"; do
    if [ -d "claude-ai/$categoria" ]; then
        echo ""
        echo "   📂 $categoria/:"
        for modulo in claude-ai/$categoria/modulo-*; do
            if [ -d "$modulo" ]; then
                modulo_name=$(basename "$modulo")
                dias_count=$(find "$modulo" -maxdepth 1 -type d -name "dias-*" | wc -l)
                echo "      ✅ $modulo_name ($dias_count períodos)"
            fi
        done
    fi
done

echo ""

# Estadísticas generales
total_categorias=$(find claude-ai -maxdepth 1 -type d | grep -v '^claude-ai$' | wc -l)
total_modulos=$(find claude-ai -path "*/modulo-*" -type d | wc -l)
total_dias=$(find claude-ai -path "*/dias-*" -type d | wc -l)

echo "📊 RESUMEN ESTADÍSTICO:"
echo "======================"
echo "   📁 Categorías: $total_categorias"
echo "   📚 Módulos: $total_modulos"
echo "   📅 Períodos de días: $total_dias"
echo ""

# Verificar .gitignore
if grep -q "claude-ai/" .gitignore; then
    echo "✅ Claude AI correctamente excluido de git"
else
    echo "⚠️ Claude AI no está en .gitignore"
fi

echo ""
echo "🎯 ESTADO DE LA ESTRUCTURA:"
echo "==========================="

if [ $total_categorias -eq 5 ] && [ $total_modulos -eq 35 ] && [ $total_dias -gt 80 ]; then
    echo "✅ Estructura COMPLETA y lista para uso"
    echo "📥 Puede empezar a importar contenido de Claude AI"
else
    echo "⚠️ Estructura INCOMPLETA - revisar directorios faltantes"
fi

echo ""
echo "📋 PRÓXIMOS PASOS:"
echo "=================="
echo "1. 📥 Importar conversaciones de Claude AI"
echo "2. 📄 Organizar documentos por días/módulos"
echo "3. 💻 Clasificar código y prototipos"
echo "4. 🎨 Ubicar artefactos y diagramas"
echo "5. 🔗 Organizar recursos y referencias"
