from quart import jsonify, request, render_template
from quart_openapi import Resource
from server.main import bp
from server.algorythm.music_generation import generate
import gpt_2_simple as gpt2


sess = gpt2.start_tf_sess(threads=1)
# gpt2.load_gpt2(sess,
#                checkpoint_dir='app/algorythm/checkpoint',
#                run_name='nmd1')


@bp.route('/healthcheck', methods=['GET', 'POST'])
class HealthCheck(Resource):
    async def get(self):
        return jsonify({'status': 'OK'})

    async def post(self):
        data = await request.get_data()
        print(data)
        return jsonify({'status': 'OK'})


@bp.route('/service', methods=['GET'])
class Service(Resource):
    genres = ['classical', 'jazz', 'rock']

    async def get(self):
        return await render_template('index.html', music_genres=self.genres)

    async def post(self):
        params = await request.json()
        music_abc = generate('default', params, sess)

        return jsonify({'music': music_abc})


@bp.route('/time')
def get_current_time():
    import time
    
    return {'time': time.time()}
