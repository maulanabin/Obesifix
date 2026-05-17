from flask import Flask

def create_app():
    app = Flask(__name__)

    # register routes
    from src.routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    return app