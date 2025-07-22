#!/bin/bash

# Script de corrección final para SVGs problemáticos
# Bootcamp MCP Server

echo "🔧 Corrigiendo colores problemáticos en SVGs..."

cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server

# Corregir fondos problemáticos
find docs/assets/images -name "*.svg" -exec sed -i 's/fill="#1a1a1a"/fill="#0f172a"/g' {} \;
find docs/assets/images -name "*.svg" -exec sed -i 's/fill="#ffffff"/fill="#0f172a"/g' {} \;
find docs/assets/images -name "*.svg" -exec sed -i 's/fill="#f8f9fa"/fill="#0f172a"/g' {} \;

# Corregir texto que usa color de fondo como color de texto
find docs/assets/images -name "*.svg" -exec sed -i 's/fill="#0f172a" font/fill="#f8fafc" font/g' {} \;
find docs/assets/images -name "*.svg" -exec sed -i 's/fill="#0f172a".*text-anchor/fill="#f8fafc" text-anchor/g' {} \;

# Cambiar tipografía a Inter
find docs/assets/images -name "*.svg" -exec sed -i 's/font-family="Arial"/font-family="Inter"/g' {} \;
find docs/assets/images -name "*.svg" -exec sed -i 's/Arial, sans-serif/Inter, system-ui, sans-serif/g' {} \;

# Cambiar colores claros por colores dark
find docs/assets/images -name "*.svg" -exec sed -i 's/fill="#2c3e50"/fill="#f8fafc"/g' {} \;
find docs/assets/images -name "*.svg" -exec sed -i 's/fill="#34495e"/fill="#64748b"/g' {} \;

echo "✅ Correcciones aplicadas a todos los SVGs"

# Validar que no haya errores XML
echo "🔍 Validando sintaxis XML..."
error_count=0
for svg in $(find docs/assets/images -name "*.svg"); do
    if ! xmllint --noout "$svg" 2>/dev/null; then
        echo "❌ Error XML en: $svg"
        error_count=$((error_count + 1))
    fi
done

if [ $error_count -eq 0 ]; then
    echo "✅ Todos los SVGs tienen sintaxis XML válida"
else
    echo "⚠️ Se encontraron $error_count SVGs con errores XML"
fi

# Generar reporte de estado
echo "📊 Generando reporte final..."
total_svgs=$(find docs/assets/images -name "*.svg" | wc -l)
dark_svgs=$(find docs/assets/images -name "*.svg" -exec grep -l 'fill="#0f172a"' {} \; | wc -l)

echo "📋 REPORTE FINAL:"
echo "   Total SVGs: $total_svgs"
echo "   SVGs con tema dark: $dark_svgs"
echo "   Porcentaje completado: $(( dark_svgs * 100 / total_svgs ))%"
