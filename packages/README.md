# Packages

Shared cross-application code should live here.

Recommended first packages:
- `types`
- `shared`
- `api-client`
- `ui`
- `config`

Current priority:
- Build `types` and `shared` first
- Extract platform-agnostic logic out of current `utils/`
- Keep WeChat-specific APIs inside the current Mini Program until migration
