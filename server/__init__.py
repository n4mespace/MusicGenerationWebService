import quart.flask_patch

from quart_openapi import Pint
from quart_compress import Compress
from quart_jwt_extended import JWTManager
from quart_cors import cors


compress = Compress()
jwt = JWTManager()


def create_app(config_class):
    app = Pint(__name__,
               title='MusicGenerationWebService',
               template_folder='static/react')

    app.config.from_object(config_class)

    app = cors(app)
    compress.init_app(app)
    jwt.init_app(app)

    # from server.errors import bp as errors_bp
    # app.register_blueprint(errors_bp, url_prefix='/errors')

    from server.algorythm import bp as algorythm_bp
    app.register_blueprint(algorythm_bp, url_prefix='/api')

    from server.main import bp as main_bp
    app.register_blueprint(main_bp)

    return app
