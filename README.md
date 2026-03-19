# KotobaLink

KotobaLink is organized as a long-lived multi-application workspace.

Current state:
- The WeChat Mini Program now lives in `apps/miniapp`.
- WeChat DevTools should open the `KotobaLink` folder and read `apps/miniapp` through `miniprogramRoot`.
- Shared workspace structure is already in place for future web, admin, and backend development.

Target state:
- `apps/miniapp` for the Mini Program
- `apps/web` for the user-facing web app
- `apps/admin` for the admin system
- `apps/backend` for backend services
- `packages/` for cross-app shared code
- `docs/` for architecture, product, API, and operations docs

Workspace:
- Root `package.json` and `pnpm-workspace.yaml` are reserved for multi-app development.
- The Mini Program still runs directly through WeChat DevTools with `miniprogramRoot: apps/miniapp/`.

Documentation:
- [Documentation Index](/c:/Users/osk/WeChatProjects/KotobaLink/docs/README.md)
- [Project Overview](/c:/Users/osk/WeChatProjects/KotobaLink/docs/project-overview.md)
- [Page Inventory](/c:/Users/osk/WeChatProjects/KotobaLink/docs/page-inventory.md)
- [Data Architecture](/c:/Users/osk/WeChatProjects/KotobaLink/docs/data-architecture.md)
- [Development Guide](/c:/Users/osk/WeChatProjects/KotobaLink/docs/development-guide.md)
- [Current Stable Baseline](/c:/Users/osk/WeChatProjects/KotobaLink/docs/architecture/current-stable-baseline.md)
- [Docs Site Plan](/c:/Users/osk/WeChatProjects/KotobaLink/docs/docs-site-plan.md)

Architecture reference:
- [Project Structure Blueprint](/c:/Users/osk/WeChatProjects/KotobaLink/docs/architecture/project-structure.md)
