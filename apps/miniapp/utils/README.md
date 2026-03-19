# Utils Compatibility Layer

This directory is now a compatibility layer.

New code should prefer:
- `../services/*`
- `../store/*`
- `../behaviors/*`

Existing files remain here only as stable import shims while page code is migrated gradually.

Notes:
- `util.js` is kept only to prevent legacy template pages from breaking.
- Do not add new business logic here.
