# MCP Server Bootcamp - Scripts de Automatización

Sistema completo de automatización que incluye autocommit inteligente, generación automática de changelog y herramientas de desarrollo para el bootcamp MCP Server.

## 🚀 Características Principales

### 🤖 Sistema de Autocommit

- **Commits automáticos cada 10 minutos**
- **Conventional Commits estándar** (feat, docs, chore, etc.)
- **Generación inteligente de mensajes** basada en patrones de archivos
- **Detección de módulos** (identifica qué módulo del bootcamp se está modificando)
- **Ejecución segura** con archivos de bloqueo
- **Logging completo** con rotación automática

### 📋 Generación Automática de Changelog

- **Generación basada en git commits** siguiendo Conventional Commits
- **Categorización automática** por tipo de cambio (Added, Fixed, Changed, etc.)
- **Versionado semántico** automático basado en tipos de commit
- **Integración con autocommit** para mantener el changelog actualizado
- **Soporte para scopes específicos** del bootcamp (module-1, examples, etc.)

### 🔧 Herramientas de Desarrollo

- **Scripts de configuración** para setup inicial
- **Validación de código** y linting
- **Build automatizado** de todos los módulos
- **Gestión fácil** de activación/desactivación

## 📦 Instalación

### Setup Rápido Completo

```bash
# Navegar al directorio del bootcamp
cd /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server

# Configurar todo el sistema de automatización
chmod +x scripts/setup-autocommit.sh
./scripts/setup-autocommit.sh
```

### Setup Manual

```bash
# Hacer ejecutables todos los scripts
chmod +x scripts/*.sh

# Configurar autocommit
./scripts/setup-autocommit.sh

# O agregar cron job manualmente (runs every 10 minutes)
(crontab -l 2>/dev/null; echo "*/10 * * * * /home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server/scripts/autocommit.sh") | crontab -
```

## �️ Scripts Disponibles

### 🤖 Autocommit y Changelog

| Script                 | Propósito                        | Uso                                     |
| ---------------------- | -------------------------------- | --------------------------------------- |
| `autocommit.sh`        | Commits automáticos inteligentes | Ejecuta vía cron cada 10 min            |
| `setup-autocommit.sh`  | Configurar autocommit y cron     | `./scripts/setup-autocommit.sh`         |
| `remove-autocommit.sh` | Desactivar autocommit            | `./scripts/remove-autocommit.sh`        |
| `autocommit-config.sh` | Archivo de configuración         | Editar para personalizar                |
| `update-changelog.sh`  | Generar/actualizar CHANGELOG.md  | `./scripts/update-changelog.sh [--tag]` |

### 🔧 Desarrollo y Build

| Script         | Propósito                      | Uso                         |
| -------------- | ------------------------------ | --------------------------- |
| `setup.sh`     | Configuración inicial completa | `./scripts/setup.sh`        |
| `build-all.sh` | Build de todos los módulos     | `./scripts/build-all.sh`    |
| `lint.sh`      | Linting y formato de código    | `./scripts/lint.sh [--fix]` |

## 🔧 Uso Detallado

### Comandos de Gestión

```bash
# Ver trabajos de cron actuales
crontab -l

# Ver logs de autocommit en tiempo real
tail -f .autocommit/autocommit.log

# Ver logs de changelog
tail -f .autocommit/changelog-generator.log

# Probar autocommit manualmente
./scripts/autocommit.sh

# Actualizar changelog manualmente
./scripts/update-changelog.sh

# Generar changelog y crear tag
./scripts/update-changelog.sh --tag

# Remove autocommit
./scripts/remove-autocommit.sh
```

### 📋 Changelog Management

```bash
# Generar changelog para versión actual (sin crear tag)
./scripts/update-changelog.sh

# Generar changelog y crear tag git automáticamente
./scripts/update-changelog.sh --tag

# Ver qué cambios se incluirían (dry-run)
./scripts/update-changelog.sh --dry-run

# Ver ayuda completa del script
./scripts/update-changelog.sh --help
```

### Log Monitoring

```bash
# Follow autocommit logs in real-time
tail -f .autocommit/autocommit.log

# Follow changelog logs in real-time
tail -f .autocommit/changelog-generator.log

# View recent commits
git log --oneline -10

# Check last autocommit status
grep "completed successfully\|ERROR" .autocommit/autocommit.log | tail -1

# Check changelog generation status
grep "Changelog updated\|ERROR" .autocommit/changelog-generator.log | tail -1
```

## � Sistema de Changelog Automático

### 🎯 Características del Changelog

- **Generación automática** basada en commits desde el último tag
- **Categorización inteligente** por tipos de cambio:
  - `Added` - Nuevas funcionalidades (feat)
  - `Fixed` - Correcciones de bugs (fix)
  - `Changed` - Cambios en funcionalidad existente (refactor)
  - `Documentation` - Cambios en documentación (docs)
  - `Testing` - Cambios en tests (test)
  - `Performance` - Mejoras de rendimiento (perf)
  - `Build System` - Cambios en build (build)
  - `CI/CD` - Cambios en CI/CD (ci)
  - `Maintenance` - Tareas de mantenimiento (chore)

### 🔄 Versionado Semántico Automático

El sistema determina automáticamente la siguiente versión basándose en los tipos de commits:

- **MAJOR** (X.0.0): Commits con `BREAKING CHANGE` o `!:`
- **MINOR** (0.X.0): Commits de tipo `feat`
- **PATCH** (0.0.X): Commits de tipo `fix`, `docs`, `chore`, etc.

### 📝 Formato de Scopes en Changelog

El sistema reconoce y formatea automáticamente scopes específicos del bootcamp:

- `module-1` → **MODULE-1**
- `module-2` → **MODULE-2**
- `examples` → **Examples**
- `docs` → **Documentation**
- `tooling` → **Tooling**
- `config` → **Configuration**

### 🔗 Integración con Autocommit

El changelog se actualiza automáticamente como parte del flujo de autocommit:

1. **Autocommit detecta cambios** importantes (no configs menores)
2. **Genera commits** con Conventional Commits
3. **Actualiza changelog** automáticamente
4. **Incluye changelog** en el commit si fue modificado
5. **Continúa con commit** normal

## 📝 Formato de Mensajes de Commit

El sistema sigue la especificación **Conventional Commits**:

```
<type>(<scope>): <description>

Ejemplos:
feat(examples): add new calculator implementation for module 1
docs(module-2): update exercise instructions for resources
chore(config): update gitignore for better file handling
test(module-3): add integration tests for persistence layer
fix(autocommit): resolve changelog integration timing issue
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
