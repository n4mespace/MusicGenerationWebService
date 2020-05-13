from server import create_app
import config


app = create_app(config_class=config.Development)
