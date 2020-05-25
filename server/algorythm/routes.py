from quart import jsonify, request, Response
from quart_openapi import Resource
from server.algorythm import bp
from server.algorythm.music_generation import generate
from config import MUSIC_GENRES
import gpt_2_simple as gpt2
import tensorflow as tf
import gc


# Start new session for generation model
sess = gpt2.start_tf_sess(threads=2)

# All pretrained models path
checkpoint_dir = 'server/algorythm/checkpoint/'

# Load trained state from checkpoint
gpt2.load_gpt2(sess,
               checkpoint_dir=checkpoint_dir,
               run_name='nmd1')

# How many times generation happened
generate_count = 0


@bp.route('/generate', methods=['GET', 'POST'])
class MusicGeneration(Resource):
    '''API for model usage

    GET and POST allowed

    Extends:
        Resource
    '''

    # Available options for generation
    genres = MUSIC_GENRES

    async def get(self) -> Response:
        global sess, generate_count

        params = request.args

        music_abc = generate(genre="nmd1",
                             checkpoint_dir=checkpoint_dir,
                             sess=sess,
                             params=params)

        generate_count += 1

        # Reload model to prevent Graph/Session from going OOM
        if generate_count == 8:
            generate_count = 0

            tf.reset_default_graph()
            sess.close()
            sess = gpt2.start_tf_sess(threads=2)
            gpt2.load_gpt2(sess,
                           checkpoint_dir=checkpoint_dir,
                           run_name='nmd1')

        # Call garbage collector
        gc.collect()

        return jsonify({'music': music_abc})

    async def post(self) -> Response:
        global sess, generate_count

        params = await request.get_json()

        music_abc = generate(genre="nmd1",
                             checkpoint_dir=checkpoint_dir,
                             sess=sess,
                             params=params)

        generate_count += 1

        # Reload model to prevent Graph/Session from going OOM
        if generate_count == 8:
            generate_count = 0

            tf.reset_default_graph()
            sess.close()
            sess = gpt2.start_tf_sess(threads=2)
            gpt2.load_gpt2(sess,
                           checkpoint_dir=checkpoint_dir,
                           run_name='nmd1')

        # Call garbage collector
        gc.collect()

        return jsonify({'music': music_abc})
