from quart import jsonify, request
from app.main import bp
from quart_openapi import Resource


@bp.route('/healthcheck', methods=['GET', 'POST'])
class HealthCheck(Resource):
    async def get(self):
        ''' Testing if app gets correctly '''
        return jsonify({'status': 'OK'})

    async def post(self):
        ''' Testing if app posts correctly '''
        data = await request.get_data()
        return jsonify({'status': 'OK'})
