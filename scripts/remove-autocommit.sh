#!/bin/bash
# Remove autocommit functionality
# Removes cron job and cleans up

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AUTOCOMMIT_SCRIPT="$SCRIPT_DIR/autocommit.sh"
REPO_DIR="/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server"

echo "Removing MCP Server Bootcamp autocommit..."

# Remove cron job
if crontab -l 2>/dev/null | grep -q "$AUTOCOMMIT_SCRIPT"; then
    crontab -l 2>/dev/null | grep -v "$AUTOCOMMIT_SCRIPT" | crontab -
    echo "✅ Removed autocommit cron job"
else
    echo "ℹ️  No autocommit cron job found"
fi

# Ask if user wants to remove logs
echo ""
read -p "Do you want to remove autocommit logs? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$REPO_DIR/.autocommit"
    echo "✅ Removed autocommit logs and directory"
else
    echo "ℹ️  Autocommit logs preserved in: $REPO_DIR/.autocommit/"
fi

echo ""
echo "🗑️  Autocommit removal completed!"
echo ""
echo "📋 Remaining files:"
echo "   • Setup script: $SCRIPT_DIR/setup-autocommit.sh"
echo "   • Autocommit script: $AUTOCOMMIT_SCRIPT"
echo ""
echo "💡 To re-enable autocommit, run:"
echo "   $SCRIPT_DIR/setup-autocommit.sh"
