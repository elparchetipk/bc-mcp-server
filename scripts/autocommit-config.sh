# Autocommit Configuration
# This file contains configuration for the autocommit system

# Commit message patterns and rules
CONVENTIONAL_COMMIT_TYPES=(
    "feat"     # New features
    "fix"      # Bug fixes  
    "docs"     # Documentation changes
    "style"    # Code style changes (formatting, etc.)
    "refactor" # Code refactoring
    "test"     # Adding or updating tests
    "chore"    # Maintenance tasks
    "build"    # Build system or dependency changes
    "ci"       # CI/CD changes
    "perf"     # Performance improvements
    "revert"   # Revert previous commit
)

# Scope mapping based on directory patterns
declare -A SCOPE_MAPPING=(
    ["docs/"]="documentation"
    ["ejemplos/modulo-01"]="module-1"
    ["ejemplos/modulo-02"]="module-2" 
    ["ejemplos/modulo-03"]="module-3"
    ["ejemplos/modulo-04"]="module-4"
    ["ejemplos/modulo-05"]="module-5"
    ["ejemplos/modulo-06"]="module-6"
    ["ejemplos/modulo-07"]="module-7"
    ["ejemplos/"]="examples"
    ["herramientas/"]="tooling"
    ["scripts/"]="scripts"
    ["tests/"]="testing"
    ["plantillas/"]="templates"
    [".github/"]="github"
    [".vscode/"]="vscode"
    ["package.json"]="dependencies"
    ["pnpm-lock.yaml"]="dependencies"
    ["yarn.lock"]="dependencies"
    ["Dockerfile"]="docker"
    ["docker-compose"]="docker"
    ["README.md"]="project"
    ["CHANGELOG.md"]="project"
    ["LICENSE"]="project"
)

# File patterns that should be ignored in autocommit
IGNORE_PATTERNS=(
    "*.log"
    "*.tmp"
    "*.cache"
    "node_modules/"
    ".git/"
    "dist/"
    "build/"
    "coverage/"
    ".nyc_output/"
    ".autocommit/"
)

# Maximum commit message length
MAX_COMMIT_MESSAGE_LENGTH=72

# Whether to auto-push commits (default: false for safety)
AUTO_PUSH=false

# Git user configuration for autocommits
AUTO_COMMIT_USER_NAME="MCP Bootcamp AutoCommit"
AUTO_COMMIT_USER_EMAIL="autocommit@mcp-bootcamp.dev"

# Logging configuration
LOG_LEVEL="INFO"  # DEBUG, INFO, WARN, ERROR
MAX_LOG_FILES=5
LOG_ROTATION_SIZE="10MB"

# Safety features
REQUIRE_CLEAN_WORKING_TREE=false
SKIP_AUTOCOMMIT_ON_CONFLICTS=true
MAX_FILES_PER_COMMIT=50

# Time-based configurations
QUIET_HOURS_START="22:00"  # Stop autocommit after this time
QUIET_HOURS_END="06:00"    # Resume autocommit after this time
WEEKEND_AUTOCOMMIT=true    # Whether to run on weekends

# Branch restrictions
ALLOWED_BRANCHES=("main" "develop" "feature/*" "hotfix/*")
PROTECTED_BRANCHES=("main" "master" "production")

# Notification settings (optional)
NOTIFY_ON_COMMIT=false
WEBHOOK_URL=""  # Slack/Discord webhook for notifications
