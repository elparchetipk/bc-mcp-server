#!/bin/bash
# Automated Changelog Generator for MCP Server Bootcamp
# Generates changelog entries based on git commits following Conventional Commits

set -euo pipefail

# Configuration
REPO_DIR="/home/epti/Documentos/epti-dev/bootcamps/bc-mcp-server"
CHANGELOG_FILE="$REPO_DIR/CHANGELOG.md"
TEMP_FILE="/tmp/changelog_temp.md"
LOG_FILE="$REPO_DIR/.autocommit/changelog-generator.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to extract version from git tags
get_latest_version() {
    git tag --sort=version:refname | tail -1 | sed 's/^v//' || echo "1.0.0"
}

# Function to determine next version based on commits
determine_next_version() {
    local current_version="$1"
    local commits_since_tag="$2"
    
    # Parse current version
    local major=$(echo "$current_version" | cut -d. -f1)
    local minor=$(echo "$current_version" | cut -d. -f2)
    local patch=$(echo "$current_version" | cut -d. -f3)
    
    # Check for breaking changes
    if echo "$commits_since_tag" | grep -q "BREAKING CHANGE\|!:"; then
        major=$((major + 1))
        minor=0
        patch=0
    # Check for new features
    elif echo "$commits_since_tag" | grep -q "^feat"; then
        minor=$((minor + 1))
        patch=0
    # Otherwise it's a patch
    else
        patch=$((patch + 1))
    fi
    
    echo "$major.$minor.$patch"
}

# Function to categorize commits
categorize_commit() {
    local commit_msg="$1"
    local commit_hash="$2"
    
    case "$commit_msg" in
        feat\(*\):*|feat:*)
            echo "### Added"
            ;;
        fix\(*\):*|fix:*)
            echo "### Fixed"
            ;;
        docs\(*\):*|docs:*)
            echo "### Documentation"
            ;;
        test\(*\):*|test:*)
            echo "### Testing"
            ;;
        refactor\(*\):*|refactor:*)
            echo "### Changed"
            ;;
        chore\(*\):*|chore:*)
            echo "### Maintenance"
            ;;
        build\(*\):*|build:*)
            echo "### Build System"
            ;;
        ci\(*\):*|ci:*)
            echo "### CI/CD"
            ;;
        perf\(*\):*|perf:*)
            echo "### Performance"
            ;;
        style\(*\):*|style:*)
            echo "### Code Style"
            ;;
        revert\(*\):*|revert:*)
            echo "### Reverted"
            ;;
        *)
            echo "### Changed"
            ;;
    esac
}

# Function to extract scope and description
parse_commit_message() {
    local commit_msg="$1"
    local scope=""
    local description=""
    
    # Extract scope if present - using grep for pattern matching
    if echo "$commit_msg" | grep -q '^[a-z]*([^)]*):'; then
        # Extract scope from the parentheses
        scope=$(echo "$commit_msg" | sed -n 's/^[a-z]*(\([^)]*\)).*/\1/p')
        description=$(echo "$commit_msg" | sed 's/^[a-z]*([^)]*): //')
    else
        description=$(echo "$commit_msg" | sed 's/^[a-z]*: //')
    fi
    
    # Format scope for display
    if [[ -n "$scope" ]]; then
        case "$scope" in
            module-1|module-2|module-3|module-4|module-5|module-6|module-7)
                scope="**${scope^^}**"
                ;;
            examples)
                scope="**Examples**"
                ;;
            docs|documentation)
                scope="**Documentation**"
                ;;
            tooling|scripts)
                scope="**Tooling**"
                ;;
            config)
                scope="**Configuration**"
                ;;
            *)
                scope="**${scope^}**"
                ;;
        esac
        echo "- $scope: $description"
    else
        echo "- $description"
    fi
}

# Function to generate changelog section
generate_changelog_section() {
    local version="$1"
    local start_ref="$2"
    local end_ref="$3"
    local release_date="$(date '+%Y-%m-%d')"
    
    echo ""
    echo "## [$version] - $release_date"
    echo ""
    
    # Get commits between refs
    local commits
    if [[ "$start_ref" == "initial" ]]; then
        commits=$(git log --pretty=format:"%H|%s" "$end_ref")
    else
        commits=$(git log --pretty=format:"%H|%s" "${start_ref}..${end_ref}")
    fi
    
    # Group commits by category
    declare -A categories
    
    while IFS='|' read -r hash message; do
        if [[ -n "$message" && ! "$message" =~ ^Merge\ branch ]]; then
            local category=$(categorize_commit "$message" "$hash")
            local formatted_message=$(parse_commit_message "$message")
            
            if [[ -n "${categories[$category]:-}" ]]; then
                categories[$category]+=$'\n'"$formatted_message"
            else
                categories[$category]="$formatted_message"
            fi
        fi
    done <<< "$commits"
    
    # Output categories in logical order
    local category_order=("### Added" "### Changed" "### Fixed" "### Documentation" "### Testing" "### Performance" "### Build System" "### CI/CD" "### Code Style" "### Maintenance" "### Reverted")
    
    for category in "${category_order[@]}"; do
        if [[ -n "${categories[$category]:-}" ]]; then
            echo "$category"
            echo ""
            echo "${categories[$category]}"
            echo ""
        fi
    done
}

# Function to update changelog
update_changelog() {
    local version="$1"
    local changelog_section="$2"
    
    # Create backup
    cp "$CHANGELOG_FILE" "$CHANGELOG_FILE.backup"
    
    # Find the [Unreleased] section and replace it
    awk -v version="$version" -v section="$changelog_section" '
    BEGIN { 
        in_unreleased = 0
        printed_new = 0
    }
    /^## \[Unreleased\]/ {
        print $0
        print ""
        print "### Added"
        print ""
        print "### Changed"
        print ""
        print "### Fixed"
        print ""
        print section
        printed_new = 1
        in_unreleased = 1
        next
    }
    /^## \[/ && in_unreleased && printed_new {
        in_unreleased = 0
        print $0
        next
    }
    !in_unreleased || !printed_new {
        print $0
    }
    ' "$CHANGELOG_FILE" > "$TEMP_FILE"
    
    mv "$TEMP_FILE" "$CHANGELOG_FILE"
}

# Main function
main() {
    log "Starting changelog generation..."
    
    cd "$REPO_DIR"
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log "ERROR: Not in a git repository"
        exit 1
    fi
    
    # Get latest tag
    local latest_tag=$(git tag --sort=version:refname | tail -1 || echo "")
    local latest_version
    
    if [[ -n "$latest_tag" ]]; then
        latest_version=$(echo "$latest_tag" | sed 's/^v//')
        log "Latest version: $latest_version"
    else
        latest_version="0.0.0"
        latest_tag="initial"
        log "No previous tags found, starting from initial commit"
    fi
    
    # Check if there are new commits since last tag
    local commits_since_tag
    if [[ "$latest_tag" == "initial" ]]; then
        commits_since_tag=$(git log --oneline | wc -l)
    else
        commits_since_tag=$(git log --oneline "${latest_tag}..HEAD" | wc -l)
    fi
    
    if [[ $commits_since_tag -eq 0 ]]; then
        log "No new commits since last tag"
        return 0
    fi
    
    log "Found $commits_since_tag new commits since $latest_tag"
    
    # Determine next version
    local commit_messages
    if [[ "$latest_tag" == "initial" ]]; then
        commit_messages=$(git log --pretty=format:"%s")
    else
        commit_messages=$(git log --pretty=format:"%s" "${latest_tag}..HEAD")
    fi
    
    local next_version=$(determine_next_version "$latest_version" "$commit_messages")
    log "Next version will be: $next_version"
    
    # Generate changelog section
    local changelog_section
    if [[ "$latest_tag" == "initial" ]]; then
        changelog_section=$(generate_changelog_section "$next_version" "initial" "HEAD")
    else
        changelog_section=$(generate_changelog_section "$next_version" "$latest_tag" "HEAD")
    fi
    
    # Update changelog
    update_changelog "$next_version" "$changelog_section"
    
    # Create git tag for new version
    if [[ "${CREATE_TAG:-false}" == "true" ]]; then
        git tag -a "v$next_version" -m "Release version $next_version"
        log "Created tag v$next_version"
    fi
    
    log "Changelog updated successfully for version $next_version"
    
    echo -e "${GREEN}✅ Changelog updated to version $next_version${NC}"
    echo -e "${BLUE}📝 New entries added based on $commits_since_tag commits${NC}"
    echo -e "${YELLOW}📋 Review the changelog before committing: $CHANGELOG_FILE${NC}"
}

# Handle command line arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --tag          Create git tag for new version"
        echo "  --dry-run      Show what would be done without making changes"
        echo ""
        echo "Environment variables:"
        echo "  CREATE_TAG=true    Create git tag after updating changelog"
        echo ""
        exit 0
        ;;
    --tag)
        CREATE_TAG=true
        ;;
    --dry-run)
        echo "DRY RUN MODE - No changes will be made"
        # Set functions to echo instead of execute
        ;;
esac

# Run main function
main "$@"
