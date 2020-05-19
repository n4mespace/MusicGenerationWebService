import pytest
from server import create_app
from config import Test as TestConfig


@pytest.fixture(name='test_app')
def _test_app():
    '''Create testing app fixture

    App defined TestConfig class

    Returns:
      quart.Quart -- app
    '''
    app = create_app(TestConfig)
    return app


@pytest.mark.asyncio
async def test_initial_post(test_app):
    '''Initial test with helthcheck endpoint

    Testing GET
    '''
    test_client = test_app.test_client()
    response = await test_client.post('/healthcheck')

    assert response.status_code == 200

    result = await response.get_json()
    assert result['status'] == 'OK'


@pytest.mark.asyncio
async def test_initial_get(test_app):
    '''Initial test with helthcheck endpoint

    Testing POST
    '''
    test_client = test_app.test_client()
    response = await test_client.get('/healthcheck')

    assert response.status_code == 200

    result = await response.get_json()
    assert result['status'] == 'OK'


@pytest.mark.asyncio
async def test_generate_get(test_app):
    '''Generation API

    Testing GET
    '''
    test_client = test_app.test_client()
    response = await test_client.get('api/generate')

    assert response.status_code == 200

    result = await response.get_json()
    assert 'music' in result
    assert len(result['music']) > 0


@pytest.mark.asyncio
async def test_generate_post(test_app):
    '''Generation API

    Testing POST
    '''
    test_client = test_app.test_client()
    data = {}
    response = await test_client.post('api/generate',
                                      json=data)

    assert response.status_code == 200

    result = await response.get_json()
    assert 'music' in result
    assert len(result['music']) > 0


@pytest.mark.asyncio
async def test_generate_post_without_prefix(test_app):
    '''Generation API

    Testing POST with [prefix] param without return
    '''
    test_client = test_app.test_client()
    data = {'prefix': 'BB/2c'}
    response = await test_client.post('api/generate',
                                      json=data)

    assert response.status_code == 200

    result = await response.get_json()
    assert len(result['music']) > 0
    assert not result['music'].startswith(data['prefix'])


@pytest.mark.asyncio
async def test_generate_post_with_prefix(test_app):
    '''Generation API

    Testing POST with [prefix] param with return
    '''
    test_client = test_app.test_client()
    data = {'prefix': 'BB/2c', 'include_prefix': True}
    response = await test_client.post('api/generate',
                                      json=data)

    assert response.status_code == 200

    result = await response.get_json()
    assert len(result['music']) > 0
    assert result['music'].startswith(data['prefix'])
