from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

import os

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    CORS(app)  # Enable Cross-Origin Resource Sharing
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Import and register blueprints
    from app.routes import main_bp
    from app.routes.auth_routes import auth_bp
    from app.routes.events_routes import events_bp
    from app.routes.favorites_routes import favorites_bp
    from app.routes.itineraries_routes import itineraries_bp
    from app.routes.itinerary_items_routes import itinerary_items_bp
    from app.routes.reviews_routes import reviews_bp

    # Register blueprints
    app.register_blueprint(main_bp, url_prefix='/')  # Root route
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(events_bp, url_prefix='/events')
    app.register_blueprint(favorites_bp, url_prefix='/favorites')
    app.register_blueprint(itineraries_bp, url_prefix='/itineraries')
    app.register_blueprint(itinerary_items_bp, url_prefix='/itinerary-items')
    app.register_blueprint(reviews_bp, url_prefix='/reviews')

    return app
