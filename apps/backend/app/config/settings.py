from pathlib import Path
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "KotobaLink API"
    app_env: str = "development"
    database_url: str = "postgresql+psycopg://kotobalink:kotobalink@postgres:5432/kotobalink"
    media_root: str = "storage"
    media_url: str = "/media"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


def get_media_root_path() -> Path:
    return (Path(__file__).resolve().parents[2] / get_settings().media_root).resolve()
