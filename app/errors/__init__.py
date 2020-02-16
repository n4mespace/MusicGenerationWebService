from quart_openapi import PintBlueprint

bp = PintBlueprint('errors', __name__)

from app.errors import handlers
