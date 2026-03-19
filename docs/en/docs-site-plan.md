# Docs Site Plan

## Current State

The project stores documentation as Markdown files under `docs/`.

## Conditions For A Docs Site

Move to an HTML documentation site when at least one of the following is true:
- multiple collaborators need a browser-based entry
- product, backend, and admin documentation grows quickly
- versioned or public documentation becomes necessary
- onboarding needs a clearer repository entry

## Current Implementation

The current documentation site uses VitePress.

## Current Structure

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
