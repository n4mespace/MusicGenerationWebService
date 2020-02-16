import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'secret'


class Development(Config):
    DEBUG = True


class Production(Config):
    SECRET_KEY = 'an actually secret key'
