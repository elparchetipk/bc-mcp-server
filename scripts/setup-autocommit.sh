#!/bin/bash
# Setup script for autocommit functionality
# Configures cron job to run every 10 minutes

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AUTOCOMMIT_SCRIPT="$SCRIPT_DIR/autocommit.sh"
REPO_DIR="/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server"

echo "Setting up MCP Server Bootcamp autocommit..."

# Make autocommit script executable
chmod +x "$AUTOCOMMIT_SCRIPT"
echo "✅ Made autocommit script executable"

# Create autocommit directory for logs
mkdir -p "$REPO_DIR/.autocommit"
echo "✅ Created autocommit directory"

# Create cron job entry
CRON_ENTRY="*/10 * * * * $AUTOCOMMIT_SCRIPT"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "$AUTOCOMMIT_SCRIPT"; then
    echo "⚠️  Autocommit cron job already exists"
else
    # Add cron job
    (crontab -l 2>/dev/null || echo ""; echo "$CRON_ENTRY") | crontab -
    echo "✅ Added autocommit cron job (every 10 minutes)"
fi

# Verify cron service is running
if systemctl is-active --quiet cron 2>/dev/null || systemctl is-active --quiet crond 2>/dev/null; then
    echo "✅ Cron service is running"
else
    echo "⚠️  Warning: Cron service may not be running. Please start it manually:"
    echo "   sudo systemctl start cron"
fi

echo ""
echo "🚀 Autocommit setup completed!"
echo ""
echo "📋 Configuration:"
echo "   • Frequency: Every 10 minutes"
echo "   • Script: $AUTOCOMMIT_SCRIPT"
echo "   • Logs: $REPO_DIR/.autocommit/autocommit.log"
echo "   • Lock file: $REPO_DIR/.autocommit/autocommit.lock"
echo ""
echo "🔧 Management commands:"
echo "   • View logs: tail -f $REPO_DIR/.autocommit/autocommit.log"
echo "   • List cron jobs: crontab -l"
echo "   • Remove autocommit: $SCRIPT_DIR/remove-autocommit.sh"
echo "   • Test manually: $AUTOCOMMIT_SCRIPT"
echo ""
echo "📝 Commit message format follows Conventional Commits:"
echo "   • feat(scope): description"
echo "   • docs(scope): description"  
echo "   • chore(scope): description"
echo "   • test(scope): description"
echo "   • build(scope): description"
