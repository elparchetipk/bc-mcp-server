# MCP Server Bootcamp - Autocommit System

A comprehensive autocommit system that automatically commits changes every 10 minutes using conventional commit standards and best practices.

## 🚀 Features

- **Automated commits every 10 minutes**
- **Conventional Commits standard** (feat, docs, chore, etc.)
- **Intelligent commit message generation** based on file patterns
- **Module-aware scoping** (detects which bootcamp module is being modified)
- **Safe execution** with lock files to prevent concurrent runs
- **Comprehensive logging** with rotation
- **Easy setup and removal**

## 📦 Installation

### Quick Setup

```bash
# Navigate to bootcamp directory
cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server

# Make setup script executable and run
chmod +x scripts/setup-autocommit.sh
./scripts/setup-autocommit.sh
```

### Manual Setup

```bash
# Make autocommit script executable
chmod +x scripts/autocommit.sh

# Add cron job (runs every 10 minutes)
(crontab -l 2>/dev/null; echo "*/10 * * * * /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server/scripts/autocommit.sh") | crontab -
```

## 🔧 Usage

### Management Commands

```bash
# View current cron jobs
crontab -l

# View autocommit logs
tail -f .autocommit/autocommit.log

# Test autocommit manually
./scripts/autocommit.sh

# Remove autocommit
./scripts/remove-autocommit.sh
```

### Log Monitoring

```bash
# Follow logs in real-time
tail -f .autocommit/autocommit.log

# View recent commits
git log --oneline -10

# Check last autocommit status
grep "completed successfully\|ERROR" .autocommit/autocommit.log | tail -1
```

## 📝 Commit Message Format

The system follows **Conventional Commits** specification:

```
<type>(<scope>): <description>

Examples:
feat(examples): add new calculator implementation for module 1
docs(documentation): update module 2 exercise instructions
chore(config): update gitignore for better file handling
test(testing): add integration tests for module 3 persistence
```

### Commit Types

- **feat**: New features or examples
- **docs**: Documentation changes
- **chore**: Maintenance, configuration changes
- **test**: Adding or updating tests
- **build**: Build system or dependency changes
- **fix**: Bug fixes
- **refactor**: Code refactoring

### Auto-detected Scopes

- **module-1** to **module-7**: Based on modulo-XX directories
- **documentation**: For docs/ changes
- **examples**: For ejemplos/ changes
- **tooling**: For herramientas/ changes
- **templates**: For plantillas/ changes
- **testing**: For tests/ changes
- **config**: For configuration files
- **dependencies**: For package.json, pnpm-lock.yaml changes

## 🔒 Safety Features

### Lock File Protection

- Uses `.autocommit/autocommit.lock` to prevent concurrent executions
- Automatically cleaned up on script exit

### Change Detection

- Only commits when there are actual changes
- Stages all modified files before committing
- Skips execution if no changes detected

### Logging and Monitoring

- Comprehensive logging to `.autocommit/autocommit.log`
- Automatic log rotation when file exceeds 10MB
- Timestamps for all operations

### Error Handling

- Graceful error handling with proper exit codes
- Lock file cleanup on unexpected termination
- Detailed error logging

## 📊 File Structure

```
.autocommit/
├── autocommit.log      # Main log file
├── autocommit.log.old  # Rotated log file
└── autocommit.lock     # Lock file (temporary)

scripts/
├── autocommit.sh           # Main autocommit script
├── setup-autocommit.sh     # Setup and installation
├── remove-autocommit.sh    # Removal and cleanup
└── autocommit-config.sh    # Configuration file
```

## ⚙️ Configuration

Edit `scripts/autocommit-config.sh` to customize:

```bash
# Repository path
REPO_DIR="/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server"

# Log file settings
MAX_LOG_SIZE=10485760  # 10MB

# Auto-push to remote (disabled by default for safety)
# Uncomment lines in autocommit.sh to enable
```

## 🚫 Removal

To completely remove autocommit functionality:

```bash
./scripts/remove-autocommit.sh
```

This will:

- Remove the cron job
- Optionally remove logs and .autocommit directory
- Preserve the script files for future use

## 🔍 Troubleshooting

### Cron Job Not Running

```bash
# Check if cron service is active
systemctl status cron

# Start cron service if needed
sudo systemctl start cron

# View cron logs
sudo journalctl -u cron
```

### Permission Issues

```bash
# Ensure scripts are executable
chmod +x scripts/*.sh

# Check file permissions in repository
ls -la scripts/
```

### Git Issues

```bash
# Verify git repository status
git status

# Check if there are any conflicts
git diff --check

# View recent autocommits
git log --grep="autocommit" --oneline
```

## 📈 Monitoring and Analytics

### View Commit Statistics

```bash
# Count autocommits today
git log --since="midnight" --grep="feat\|docs\|chore" --oneline | wc -l

# View commit types distribution
git log --oneline | grep -E "(feat|docs|chore|test|build)" | cut -d: -f1 | sort | uniq -c

# Check autocommit frequency
grep "Successfully created commit" .autocommit/autocommit.log | tail -10
```

## 🤝 Contributing

When working on the autocommit system:

1. Test changes manually before deployment
2. Update documentation for new features
3. Follow the same conventional commit standards
4. Consider backwards compatibility

## 📄 License

This autocommit system is part of the MCP Server Bootcamp project and follows the same license terms.
