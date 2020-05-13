import gpt_2_simple as gpt2


def generate(genre, params, sess):
    music = gpt2.generate(sess,
                          length=200,
                          nsamples=1,
                          batch_size=1,
                          temperature=float(
                              params.get('temperature', 1.0)),
                          top_k=int(params.get('top_k', 10)),
                          prefix=params.get(
                              'prefix', '<|startoftext|>'),
                          truncate='<|endoftext|>',
                          include_prefix=False,
                          return_as_list=True,
                          )[0]

    # music = gpt2.generate(sess,
    #                       length=250,
    #                       run_name=genre,
    #                       temperature=1.0,
    #                       nsamples=1,
    #                       batch_size=1,
    #                       top_k=5,
    #                       prefix='<|startoftext|>',
    #                       truncate='<|endoftext|>',
    #                       include_prefix=False,
    #                       return_as_list=True,
    #                       )

    return music

