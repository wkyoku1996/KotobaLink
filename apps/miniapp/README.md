# Miniapp

The WeChat Mini Program now lives here and is the only runnable app in the repository at the moment.

Current structure:

```text
apps/miniapp/
  app.js
  app.json
  app.wxss
  behaviors/
  config/
  components/
  mock/
  pages/
  services/
  store/
  templates/
  utils/
  sitemap.json
```

Current working rules:
- WeChat DevTools should open the `KotobaLink` directory.
- `KotobaLink/project.config.json` now points `miniprogramRoot` at this folder.
- `services/` is the Mini Program-facing data entry layer.
- `store/` owns local persistence and storage-backed state.
- `mock/` owns demo fixtures and demo assembly logic.
- `config/` owns Mini Program-local constants.
- `utils/` is a compatibility layer and should not receive new business logic.

Page grouping:
- `pages/tab/`
- `pages/learning/`
- `pages/catalog/`
- `pages/account/`
- `pages/engagement/`
- `pages/commerce/`
- `pages/legacy/`
