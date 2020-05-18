import pytest
from server import create_app
from config import Test as TestConfig


@pytest.fixture(name='test_app')
def _test_app(tmpdir):
    app = create_app(TestConfig)
    return app


@pytest.mark.asyncio
async def test_initial_post(test_app):
    test_client = test_app.test_client()
    response = await test_client.post('/healthcheck')

    assert response.status_code == 200

    result = await response.get_json()
    assert result['status'] == 'OK'


@pytest.mark.asyncio
async def test_initial_get(test_app):
    test_client = test_app.test_client()
    response = await test_client.get('/healthcheck')

    assert response.status_code == 200

    result = await response.get_json()
    assert result['status'] == 'OK'


@pytest.mark.asyncio
async def test_generate_get(test_app):
    test_client = test_app.test_client()
    response = await test_client.get('/generate')

    assert response.status_code == 200

    result = await response.get_json()
    assert len(result['music']) > 0
