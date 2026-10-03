from __future__ import annotations

from functools import lru_cache

from pydantic import Field, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

_DEFAULT_JWT_SECRET = "change-me-to-a-long-random-string"
_MIN_JWT_SECRET_LENGTH = 32
_MIN_PRODUCTION_BCRYPT_ROUNDS = 10
_PRODUCTION_LIKE = frozenset({"production", "prod", "staging", "stage"})


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = "DoAide Inventory"
    app_version: str = "1.0.0"
    environment: str = "development"
    debug: bool = True
    api_v1_prefix: str = "/api/v1"
    backend_cors_origins: str = "http://localhost:5173,http://localhost:3000"
    docs_enabled: bool = True
    log_level: str = "INFO"

    jwt_secret: str = _DEFAULT_JWT_SECRET
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    bcrypt_rounds: int = Field(default=12, ge=4, le=31)

    database_url: str = "postgresql+psycopg://inventory:inventory@localhost:5432/inventory"
    db_pool_size: int = Field(default=10, ge=1, le=100)
    db_max_overflow: int = Field(default=5, ge=0, le=100)
    db_pool_timeout: int = Field(default=30, ge=1, le=300)
    db_pool_recycle: int = Field(default=1800, ge=60)
    db_echo: bool = False
    db_statement_timeout_seconds: int = Field(default=30, ge=0, le=600)

    redis_url: str = "redis://localhost:6379/0"

    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"

    max_upload_mb: int = 15

    @field_validator("access_token_expire_minutes", "max_upload_mb")
    @classmethod
    def _positive(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("must be positive")
        return v

    @field_validator("environment")
    @classmethod
    def _normalised_environment(cls, v: str) -> str:
        return v.strip().lower() or "development"

    @field_validator("database_url")
    @classmethod
    def _known_database(cls, v: str) -> str:
        url = v.strip()
        if not url:
            raise ValueError("DATABASE_URL must be set")
        if not url.startswith(("postgresql", "sqlite")):
            raise ValueError(f"DATABASE_URL must be a postgresql:// or sqlite:// URL")
        return url

    @model_validator(mode="after")
    def _production_invariants(self) -> Settings:
        if not self.is_production:
            return self
        if self.jwt_secret == _DEFAULT_JWT_SECRET:
            raise ValueError("JWT_SECRET must be set to a strong random value in production.")
        if len(self.jwt_secret) < _MIN_JWT_SECRET_LENGTH:
            raise ValueError(f"JWT_SECRET must be at least {_MIN_JWT_SECRET_LENGTH} characters.")
        if self.bcrypt_rounds < _MIN_PRODUCTION_BCRYPT_ROUNDS:
            raise ValueError(f"BCRYPT_ROUNDS must be at least {_MIN_PRODUCTION_BCRYPT_ROUNDS}.")
        if self.debug:
            raise ValueError("DEBUG must be false in production.")
        origins = self.cors_origins
        if "*" in origins:
            raise ValueError("BACKEND_CORS_ORIGINS must list explicit origins in production.")
        return self

    @property
    def is_production(self) -> bool:
        return self.environment in _PRODUCTION_LIKE

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.backend_cors_origins.split(",") if o.strip()]

    @property
    def max_upload_bytes(self) -> int:
        return self.max_upload_mb * 1024 * 1024

    def startup_report(self) -> dict[str, object]:
        return {
            "app_name": self.app_name,
            "environment": self.environment,
            "debug": self.debug,
            "docs_enabled": self.docs_enabled,
        }


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
