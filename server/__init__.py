import quart.flask_patch

from quart_openapi import Pint
from quart_compress import Compress
from quart_jwt_extended import JWTManager
from quart_cors import cors
from config import Config
from quart.app import Quart


compress = Compress()
jwt = JWTManager()


def create_app(config_class: Config) -> Quart:
    '''Create Quart app given Config class

    Use:
        Compress for files sizes reduction
        JWTManager for tokens
        CORS for savity

    Arguments:
        config_class {Config} -- class with configuration attrs

    Returns:
        Quart -- created app instance
    '''
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
