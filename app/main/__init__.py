from quart_openapi import PintBlueprint

bp = PintBlueprint('main', __name__)

from app.main import routes
