from quart_openapi import PintBlueprint

bp = PintBlueprint('main', __name__)

from server.main import routes
