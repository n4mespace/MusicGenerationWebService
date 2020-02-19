import quart.flask_patch

from quart_openapi import Pint
from quart_compress import Compress

compress = Compress()


def create_app(config_class):
    app = Pint(__name__, title='MusicGenerationWebService')
    app.config.from_object(config_class)

    compress.init_app(app)

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp, url_prefix='/errors')

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    return app


from app import models
