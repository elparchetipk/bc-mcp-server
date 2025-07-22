#!/bin/bash

# Validador final para conversión SVG Dark Theme
# Bootcamp MCP Server

echo "🔍 VALIDACIÓN FINAL DE CONVERSIÓN SVG A TEMA DARK"
echo "=================================================="

cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server

# Contadores
total_svgs=0
dark_theme_svgs=0
validation_errors=0
color_issues=0

echo "📊 Analizando archivos SVG..."

# Verificar cada módulo
for modulo in docs/assets/images/modulos/modulo-*; do
    if [ -d "$modulo" ]; then
        modulo_name=$(basename "$modulo")
        echo ""
        echo "📁 $modulo_name:"

        svg_count=0
        dark_count=0

        while IFS= read -r -d '' svg_file; do
            total_svgs=$((total_svgs + 1))
            svg_count=$((svg_count + 1))

            # Verificar si tiene tema dark
            if grep -q "#0f172a" "$svg_file"; then
                dark_theme_svgs=$((dark_theme_svgs + 1))
                dark_count=$((dark_count + 1))
                status="✅"
            else
                status="❌"
                color_issues=$((color_issues + 1))
            fi

            # Verificar sintaxis XML
            if ! xmllint --noout "$svg_file" 2>/dev/null; then
                validation_errors=$((validation_errors + 1))
                status="$status ⚠️ XML"
            fi

            relative_path=${svg_file#docs/assets/images/modulos/}
            echo "   $status $relative_path"

        done < <(find "$modulo" -name "*.svg" -print0)

        echo "   📈 $dark_count/$svg_count SVGs convertidos"
    fi
done

echo ""
echo "📋 RESUMEN FINAL:"
echo "=================="
echo "📁 Total de SVGs encontrados: $total_svgs"
echo "🌙 SVGs con tema dark: $dark_theme_svgs"
echo "📈 Porcentaje de conversión: $(( dark_theme_svgs * 100 / total_svgs ))%"
echo "⚠️ Errores de validación XML: $validation_errors"
echo "🎨 Problemas de color: $color_issues"

if [ $color_issues -eq 0 ] && [ $validation_errors -eq 0 ]; then
    echo ""
    echo "🎉 ¡CONVERSIÓN COMPLETADA EXITOSAMENTE!"
    echo "✅ Todos los SVGs han sido convertidos al tema dark"
    echo "✅ Sintaxis XML válida en todos los archivos"
    echo "✅ Paleta de colores dark aplicada correctamente"
else
    echo ""
    echo "⚠️ SE REQUIERE ATENCIÓN:"
    if [ $color_issues -gt 0 ]; then
        echo "   🎨 $color_issues SVGs necesitan conversión de color"
    fi
    if [ $validation_errors -gt 0 ]; then
        echo "   ⚠️ $validation_errors SVGs tienen errores XML"
    fi
fi

echo ""
echo "🔗 PRÓXIMOS PASOS:"
echo "=================="
echo "1. Revisar visualmente los SVGs en VS Code"
echo "2. Verificar integración en documentación"
echo "3. Actualizar guías de estilo para futuros SVGs"
echo "4. Implementar validación automática en CI/CD"
