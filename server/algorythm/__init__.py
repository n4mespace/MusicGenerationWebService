from quart_openapi import PintBlueprint

bp = PintBlueprint('algorythm', __name__)

from server.algorythm import routes
