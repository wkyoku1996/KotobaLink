# Backend

Python backend service for KotobaLink.

## Stack

- FastAPI
- SQLAlchemy 2.0
- Alembic
- PostgreSQL

## Current data layer

The first real database-backed modules are in place:

- `students`
- `courses`
- `enrollments`
- `orders`

For local development, the backend currently ensures tables exist on startup and seeds a minimal demo dataset for API verification.

## Local development

Recommended:

```bash
docker compose -f infra/docker/compose.yaml up --build
```

Manual backend-only setup:

```bash
cd apps/backend
python -m venv .venv
.venv\Scripts\activate
pip install -e .[dev]
uvicorn app.main:app --reload
```

Migration commands:

```bash
cd apps/backend
alembic revision -m "init"
alembic upgrade head
```

API docs:

- OpenAPI: `http://localhost:8000/docs`
- Health: `http://localhost:8000/health`
