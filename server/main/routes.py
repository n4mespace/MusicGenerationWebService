from quart import jsonify, request, render_template, Response
from quart_openapi import Resource
from config import MUSIC_GENRES
from server.main import bp


@bp.route('/healthcheck', methods=['GET', 'POST'])
class HealthCheck(Resource):
    '''Server success startup checker

    Extends:
        Resource
    '''
    async def get(self) -> Response:
        '''GET checker

        Must return json with success status
        '''
        return jsonify({'status': 'OK'})

    async def post(self) -> Response:
        '''POST checker

        Must get data and return json with success status
        '''
        data = await request.get_data()
        print(data)
        return jsonify({'status': 'OK'})


@bp.route('/service', methods=['GET'])
class Service(Resource):
    '''Main page

    Serve client side

    Extends:
        Resource
    '''

    # Available options for generation
    genres = MUSIC_GENRES

    async def get(self) -> Response:
        '''Main page

        Renders main page template
        '''
        return await render_template(
            'index.html', music_genres=self.genres)
