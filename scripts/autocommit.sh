#!/bin/bash
# Auto-commit script for MCP Server Bootcamp
# Executes every 10 minutes to automatically commit changes
# Follows conventional commit standards

set -euo pipefail

# Configuration
REPO_DIR="/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server"
LOG_FILE="$REPO_DIR/.autocommit/autocommit.log"
LOCK_FILE="$REPO_DIR/.autocommit/autocommit.lock"
MAX_LOG_SIZE=10485760  # 10MB

# Ensure log directory exists
mkdir -p "$REPO_DIR/.autocommit"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if another instance is running
if [ -f "$LOCK_FILE" ]; then
    log "WARNING: Another autocommit instance is running. Exiting."
    exit 0
fi

# Create lock file
echo $$ > "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

# Rotate log if too large
if [ -f "$LOG_FILE" ] && [ "$(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE" 2>/dev/null || echo 0)" -gt $MAX_LOG_SIZE ]; then
    mv "$LOG_FILE" "$LOG_FILE.old"
    log "Log rotated due to size limit"
fi

log "Starting autocommit process..."

# Navigate to repository
cd "$REPO_DIR"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    log "ERROR: Not in a git repository"
    exit 1
fi

# Function to detect file types and generate appropriate commit messages
generate_commit_message() {
    local changes="$1"
    local commit_type="feat"
    local scope=""
    local description=""
    local files_added=0
    local files_modified=0
    local files_deleted=0
    
    # Count changes by type (with safe defaults)
    local files_added files_modified files_deleted
    files_added=$(echo "$changes" | grep -c "^A" 2>/dev/null || echo "0")
    files_modified=$(echo "$changes" | grep -c "^M" 2>/dev/null || echo "0")
    files_deleted=$(echo "$changes" | grep -c "^D" 2>/dev/null || echo "0")
    
    # Ensure variables are numeric
    files_added=${files_added:-0}
    files_modified=${files_modified:-0}
    files_deleted=${files_deleted:-0}
    
    # Detect primary change type based on file patterns
    if echo "$changes" | grep -q "docs/"; then
        commit_type="docs"
        scope="documentation"
    elif echo "$changes" | grep -q "ejemplos/"; then
        commit_type="feat"
        scope="examples"
    elif echo "$changes" | grep -q "herramientas/\|scripts/"; then
        commit_type="feat"
        scope="tooling"
    elif echo "$changes" | grep -q "tests/"; then
        commit_type="test"
        scope="testing"
    elif echo "$changes" | grep -q "package\.json\|pnpm-lock\.yaml\|yarn\.lock"; then
        commit_type="build"
        scope="dependencies"
    elif echo "$changes" | grep -q "\.gitignore\|\.github/\|\.vscode/"; then
        commit_type="chore"
        scope="config"
    elif echo "$changes" | grep -q "README\.md\|CHANGELOG\.md\|LICENSE"; then
        commit_type="docs"
        scope="project"
    elif echo "$changes" | grep -q "plantillas/"; then
        commit_type="feat"
        scope="templates"
    else
        commit_type="feat"
        scope="bootcamp"
    fi
    
    # Generate description based on changes
    if [ $files_added -gt 0 ] && [ $files_modified -eq 0 ] && [ $files_deleted -eq 0 ]; then
        if [ $files_added -eq 1 ]; then
            description="add new file"
        else
            description="add $files_added new files"
        fi
    elif [ $files_added -eq 0 ] && [ $files_modified -gt 0 ] && [ $files_deleted -eq 0 ]; then
        if [ $files_modified -eq 1 ]; then
            description="update file content"
        else
            description="update $files_modified files"
        fi
    elif [ $files_added -eq 0 ] && [ $files_modified -eq 0 ] && [ $files_deleted -gt 0 ]; then
        if [ $files_deleted -eq 1 ]; then
            description="remove obsolete file"
        else
            description="remove $files_deleted obsolete files"
        fi
    else
        # Calculate total changes safely
        local total_changes
        total_changes=$(echo "$changes" | wc -l)
        description="update project structure ($total_changes changes)"
    fi
    
    # Add module-specific context if changes are in specific modules
    local module_context=""
    if echo "$changes" | grep -q "modulo-01"; then
        module_context=" for module 1 (fundamentals)"
    elif echo "$changes" | grep -q "modulo-02"; then
        module_context=" for module 2 (advanced tools)"
    elif echo "$changes" | grep -q "modulo-03"; then
        module_context=" for module 3 (persistence)"
    elif echo "$changes" | grep -q "modulo-04"; then
        module_context=" for module 4 (security)"
    elif echo "$changes" | grep -q "modulo-05"; then
        module_context=" for module 5 (testing)"
    elif echo "$changes" | grep -q "modulo-06"; then
        module_context=" for module 6 (advanced architectures)"
    elif echo "$changes" | grep -q "modulo-07"; then
        module_context=" for module 7 (final project)"
    fi
    
    # Construct final commit message
    if [ -n "$scope" ]; then
        echo "${commit_type}(${scope}): ${description}${module_context}"
    else
        echo "${commit_type}: ${description}${module_context}"
    fi
}

# Check for unstaged changes
if ! git diff --quiet; then
    log "Found unstaged changes, staging all files..."
    git add .
fi

# Check for staged changes
if git diff --cached --quiet; then
    log "No staged changes found. Nothing to commit."
    exit 0
fi

# Get the status of staged files
staged_changes=$(git diff --cached --name-status)
log "Staged changes detected:"
echo "$staged_changes" | while read line; do
    log "  $line"
done

# Generate commit message
commit_message=$(generate_commit_message "$staged_changes")
log "Generated commit message: $commit_message"

# Update changelog if there are substantial changes
# (Skip for minor config changes to avoid excessive changelog entries)
if ! echo "$staged_changes" | grep -q "^M.*\.gitignore$\|^M.*\.github/\|^A.*\.gitkeep$"; then
    log "Updating changelog before commit..."
    if "$REPO_DIR/scripts/update-changelog.sh" >> "$LOG_FILE" 2>&1; then
        log "Changelog updated successfully"
        
        # Check if changelog was modified and stage it
        if ! git diff --quiet CHANGELOG.md; then
            git add CHANGELOG.md
            log "Staged updated CHANGELOG.md"
        fi
    else
        log "WARNING: Failed to update changelog, proceeding with commit anyway"
    fi
else
    log "Skipping changelog update for minor configuration changes"
fi

# Create commit
if git commit -m "$commit_message"; then
    log "Successfully created commit: $commit_message"
    
    # Get commit hash
    commit_hash=$(git rev-parse HEAD)
    log "Commit hash: $commit_hash"
    
    # Optionally push to remote (uncomment if auto-push is desired)
    # if git push origin $(git branch --show-current) 2>/dev/null; then
    #     log "Successfully pushed to remote repository"
    # else
    #     log "WARNING: Failed to push to remote repository"
    # fi
else
    log "ERROR: Failed to create commit"
    exit 1
fi

log "Autocommit process completed successfully"
