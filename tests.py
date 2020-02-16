import pytest
from app import create_app
from config import Config


class TestConfig(Config):
    pass


@pytest.fixture(name='test_app')
def _test_app(tmpdir):
    app = create_app()
    app.config.from_object(TestConfig)
    return app


@pytest.mark.asyncio
async def test_create(test_app):
    test_client = test_app.test_client()
    response = await test_client.post('/health_check')
    assert response['status'] == 'OK'
