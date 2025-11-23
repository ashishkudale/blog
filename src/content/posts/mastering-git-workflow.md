---
title: "Mastering Git: Essential Commands and Workflows"
date: "2024-11-15"
excerpt: "Level up your Git skills with this comprehensive guide covering essential commands, branching strategies, and collaborative workflows."
author: "Ashish Kudale"
tags: ["Git", "Version Control", "DevOps", "Collaboration"]
coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop"
---

Git is the backbone of modern software development. Whether you're working solo or on a team, mastering Git will make you a more effective developer.

## Essential Git Commands

### Setting Up

Configure your identity first:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Basic Workflow

```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/user/repo.git

# Check status
git status

# Stage changes
git add .                    # Stage all changes
git add filename.js          # Stage specific file

# Commit changes
git commit -m "Add new feature"

# Push to remote
git push origin main
```

## Branching Strategies

Branches let you work on features without affecting the main codebase:

```bash
# Create and switch to a new branch
git checkout -b feature/new-feature

# List all branches
git branch -a

# Switch branches
git checkout main

# Merge a branch
git merge feature/new-feature

# Delete a branch
git branch -d feature/new-feature
```

## Working with Remote Repositories

Here's a common workflow using GitHub Gists for code sharing:

{% gist https://gist.github.com/octocat/6cad326836d38bd3a7ae %}

## Handling Merge Conflicts

When conflicts occur:

1. Git will mark the conflicting files
2. Open the files and look for conflict markers
3. Choose which changes to keep
4. Stage and commit the resolved files

```bash
# After resolving conflicts
git add .
git commit -m "Resolve merge conflicts"
```

## Useful Git Aliases

Add these to your `.gitconfig`:

```bash
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --all
    unstage = reset HEAD --
```

## Interactive Rebase

Clean up your commit history before merging:

```bash
# Rebase last 3 commits
git rebase -i HEAD~3
```

In the editor, you can:
- `pick` - keep commit
- `squash` - combine with previous commit
- `reword` - change commit message
- `drop` - remove commit

## Git Stash

Save work in progress without committing:

```bash
# Stash changes
git stash

# List stashes
git stash list

# Apply most recent stash
git stash pop

# Apply specific stash
git stash apply stash@{2}
```

## Best Practices

1. **Commit often** - Small, focused commits are easier to review and revert
2. **Write meaningful commit messages** - Future you will thank you
3. **Use branches** - Never work directly on main/master
4. **Pull before push** - Avoid merge conflicts
5. **Review before committing** - Use `git diff` to check your changes

## Conclusion

Git is a powerful tool that becomes more valuable as you learn its advanced features. Practice these commands regularly, and you'll become a Git expert in no time!
