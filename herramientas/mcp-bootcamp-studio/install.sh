#!/bin/bash

# Script de instalación y desarrollo para MCP Bootcamp Studio
# Ejecutar desde: herramientas/mcp-bootcamp-studio/

set -e

echo "🚀 Instalando MCP Bootcamp Studio..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecutar desde el directorio herramientas/mcp-bootcamp-studio/"
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Compilar TypeScript
echo "🔨 Compilando TypeScript..."
npm run compile

# Verificar compilación
if [ ! -d "dist" ]; then
    echo "❌ Error: La compilación falló"
    exit 1
fi

echo "✅ MCP Bootcamp Studio instalado correctamente"
echo ""
echo "🎯 Próximos pasos:"
echo "1. Abrir VS Code en este directorio"
echo "2. Presionar F5 para ejecutar en modo debug"
echo "3. Agregar un servidor MCP del bootcamp"
echo "4. ¡Empezar a desarrollar!"
echo ""
echo "📚 Recursos útiles:"
echo "- README.md: Documentación completa"
echo "- src/extension.ts: Punto de entrada principal"
echo "- src/mcp/: Lógica de conexión MCP"
echo ""
echo "🎉 ¡Disfruta la experiencia MCP integrada en VS Code!"
