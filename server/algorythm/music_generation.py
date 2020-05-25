import gpt_2_simple as gpt2
from tensorflow import Session


def generate(genre: str,
             checkpoint_dir: str,
             sess: Session,
             params: dict) -> str:
    '''Generate music given model session and params

    Arguments:
      genre {str} -- genre name
      checkpoint_dir {str} -- chechpoint path
      sess {tf.Session} -- model session
      params {dict} -- additional params

    Returns:
      str -- generated music
    '''
    t = float(params.get('temperature', 1.0))
    k = int(params.get('top_k', 5))
    include_prefix = bool(params.get('include_prefix', False))
    prefix = params.get('prefix', '<|startoftext|>')

    music = gpt2.generate(sess,
                          length=250,
                          run_name=genre,
                          checkpoint_dir=checkpoint_dir,
                          temperature=t,
                          nsamples=1,
                          batch_size=1,
                          top_k=k,
                          prefix=prefix,
                          truncate='<|endoftext|>',
                          include_prefix=include_prefix,
                          return_as_list=True,
                          )[0]

    return music if include_prefix else music.lstrip(prefix)


# For debuging run as script
if __name__ == '__main__':
    import time

    # Load model session
    sess = gpt2.start_tf_sess(threads=1)

    # Load model state from checkpoint
    checkpoint_dir = 'server/algorythm/checkpoint/'
    gpt2.load_gpt2(sess,
                   checkpoint_dir=checkpoint_dir,
                   run_name='nmd1')

    # Generate samples
    start = time.time()
    music = generate('nmd1', checkpoint_dir, sess, {})
    end = time.time()

    print(music, f'\nExec time: {end - start}')
