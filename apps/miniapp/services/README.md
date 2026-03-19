# Services

Mini Program service-layer code lives here.

Use this directory for:
- demo data assembly
- page-facing data selectors
- business orchestration that is still Mini Program-local

Current files:
- `demo-service.js`: stable service entry for demo data selectors

Related source directories:
- `../mock/`: demo fixture data source
- `../config/`: demo storage keys and default state

Future direction:
- gradually extract platform-agnostic helpers into `packages/shared`
- keep `wx` storage and Mini Program-specific orchestration local until fully separated
