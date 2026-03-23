from collections.abc import Generator

from sqlalchemy.orm import Session

from app.db.init_data import ensure_seed_data
from app.db.session import SessionLocal


def get_db_session() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        ensure_seed_data(session)
        yield session
    finally:
        session.close()
