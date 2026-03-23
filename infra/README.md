# Infra

Infrastructure and local development assets live here.

## Local stack

- `infra/docker/compose.yaml`: local development stack
- `infra/docker/.env.example`: example environment variables

Current stability rules:

- Compose project name is fixed to `kotobalink`
- Service startup depends on health checks, not just process start
- Admin dependency install is locked by `apps/admin/pnpm-lock.yaml`
- Admin `node_modules` and `pnpm store` are isolated through named volumes
