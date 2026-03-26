---
name: deploying-to-github
description: Handles the end-to-end process of initializing, committing, and pushing a static website to a GitHub repository for Vercel deployment. Triggered by requests like "push to git", "deploy to vercel", or "update repo".
---

# Deploying to GitHub (Skill)

This skill ensures a clean, synchronized state between the local development environment and the remote GitHub repository.

## Workflow

### 1. Pre-Push Validation
- Verify the current directory is the project root.
- Ensure all Phase/Task documentation is up to date in `task.md`.

### 2. Initialization & Sync
When pushing for the first time or resolving sync errors, use the following logic:
```powershell
git init
git add .
git commit -m "Final TK-TAX Minimalist Design"
git branch -M main
git remote add origin https://github.com/Millerg105/TK-TAX.git
git push -f -u origin main
```

### 3. Incremental Updates
For subsequent updates during the session:
```powershell
git add .
git commit -m "[Brief description of changes]"
git push origin main
```

## Best Practices
- Always use the `main` branch for Vercel consistency.
- Use the `-f` (force) flag only when resolving fatal synchronization mismatches or at the user's explicit request.
- Provide the user with the exact command block if terminal background processes appear to hang.
