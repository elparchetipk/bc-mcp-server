#!/bin/bash

# Script para eliminar archivos de backup SVG
# Bootcamp MCP Server - Limpieza de archivos temporales

set -e

echo "🧹 LIMPIEZA DE ARCHIVOS BACKUP SVG"
echo "==================================="

cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server

# Contar archivos de backup
backup_count=$(find docs/assets/images -name "*.svg.backup" | wc -l)

if [ $backup_count -eq 0 ]; then
    echo "✅ No se encontraron archivos de backup para eliminar."
    exit 0
fi

echo "📊 Se encontraron $backup_count archivos de backup SVG"
echo ""

# Verificar que los archivos SVG originales están en buen estado
echo "🔍 Verificando integridad de archivos SVG originales..."
error_count=0

while IFS= read -r -d '' svg_file; do
    if ! xmllint --noout "$svg_file" 2>/dev/null; then
        echo "❌ Error XML en: $svg_file"
        error_count=$((error_count + 1))
    fi
done < <(find docs/assets/images -name "*.svg" -not -name "*.backup" -print0)

if [ $error_count -gt 0 ]; then
    echo "⚠️ Se encontraron $error_count archivos SVG con errores."
    echo "❌ No se eliminarán los backups por seguridad."
    echo "🔧 Por favor, corrige los errores antes de continuar."
    exit 1
fi

echo "✅ Todos los archivos SVG originales están en buen estado"
echo ""

# Mostrar algunos archivos que se van a eliminar
echo "📋 Archivos de backup a eliminar (primeros 10):"
find docs/assets/images -name "*.svg.backup" | head -10 | while read -r file; do
    size=$(stat -c%s "$file")
    echo "   🗑️ $file (${size} bytes)"
done

if [ $backup_count -gt 10 ]; then
    echo "   ... y $(($backup_count - 10)) archivos más"
fi
echo ""

# Calcular espacio a liberar
total_size=$(find docs/assets/images -name "*.svg.backup" -exec stat -c%s {} + | awk '{sum+=$1} END {print sum}')
total_size_kb=$((total_size / 1024))
total_size_mb=$((total_size_kb / 1024))

echo "💾 Espacio a liberar: ${total_size} bytes (${total_size_kb} KB / ${total_size_mb} MB)"
echo ""

# Confirmación de seguridad
echo "⚠️ ¿Estás seguro de que quieres eliminar todos los archivos de backup?"
echo "   Esta acción NO se puede deshacer."
echo ""
echo "✅ Los archivos SVG originales están validados y en buen estado."
echo "🔄 Los backups ya no son necesarios después de la conversión exitosa."
echo ""

read -p "Presiona ENTER para continuar o Ctrl+C para cancelar..."

# Eliminación segura
echo ""
echo "🗑️ Eliminando archivos de backup..."

deleted_count=0
failed_count=0

while IFS= read -r -d '' backup_file; do
    if rm "$backup_file" 2>/dev/null; then
        deleted_count=$((deleted_count + 1))
        echo "   ✅ $(basename "$backup_file")"
    else
        failed_count=$((failed_count + 1))
        echo "   ❌ Error eliminando: $backup_file"
    fi
done < <(find docs/assets/images -name "*.svg.backup" -print0)

echo ""
echo "📊 RESUMEN DE LIMPIEZA:"
echo "======================"
echo "✅ Archivos eliminados exitosamente: $deleted_count"

if [ $failed_count -gt 0 ]; then
    echo "❌ Archivos que no se pudieron eliminar: $failed_count"
fi

echo "💾 Espacio liberado: ${total_size_kb} KB (${total_size_mb} MB)"
echo ""

# Verificación final
remaining_backups=$(find docs/assets/images -name "*.svg.backup" | wc -l)

if [ $remaining_backups -eq 0 ]; then
    echo "🎉 ¡LIMPIEZA COMPLETADA EXITOSAMENTE!"
    echo "✅ Todos los archivos de backup han sido eliminados"
    echo "📁 El directorio está limpio y optimizado"
else
    echo "⚠️ Aún quedan $remaining_backups archivos de backup"
    echo "🔍 Revisa los permisos o errores reportados arriba"
fi

echo ""
echo "📋 PRÓXIMOS PASOS:"
echo "=================="
echo "1. ✅ Verificar que los SVGs se muestran correctamente"
echo "2. 🔄 Hacer commit de los cambios limpios"
echo "3. 📚 Continuar con el desarrollo del bootcamp"
