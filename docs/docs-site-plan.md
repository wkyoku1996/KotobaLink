# Docs Site Plan

## Current State

The project currently keeps documentation as raw Markdown files under `docs/`.

This is the right default for the current phase because:
- writing speed is high
- structure is still evolving
- the project only has one runnable app today

## When To Build A Docs Site

Move from raw Markdown to an HTML documentation site when at least one of these becomes true:
- multiple developers need a consistent browser-based documentation entry
- product, backend, and admin documentation start growing quickly
- you want versioned docs or public/internal sharing
- the repository needs a clearer onboarding portal

## Recommended Option

Recommended future choice: `VitePress`

Reason:
- lightweight
- Markdown-first
- easy sidebar and navigation
- good for engineering and product docs
- low setup cost for a repository like KotobaLink

## Suggested Future Structure

```text
docs/
  .vitepress/
    config.mts
  index.md
  project-overview.md
  page-inventory.md
  data-architecture.md
  development-guide.md
  architecture/
```

## Suggested Adoption Path

1. Keep writing Markdown first
2. Stabilize the main documentation set
3. Add a docs-site tool only when navigation and discoverability start hurting
4. Reuse the existing Markdown files as the site content source

## Current Recommendation

Do not build the docs site yet unless you already want browser-based team sharing.

For now, the best approach is:
- keep `docs/README.md` as the documentation index
- keep root `README.md` as the repository entry
- continue writing documentation in Markdown
