import os

import pytest
from pydantic import ValidationError


def test_production_invariants():
    os.environ["ENVIRONMENT"] = "production"
    os.environ["JWT_SECRET"] = "change-me-to-a-long-random-string"
    os.environ["BCRYPT_ROUNDS"] = "4"
    os.environ["DEBUG"] = "false"

    from app.core.config import Settings

    with pytest.raises(ValidationError):
        Settings()

    os.environ["ENVIRONMENT"] = "development"
    os.environ["JWT_SECRET"] = "test-secret-key-for-tests-only"
    os.environ["DEBUG"] = "true"
