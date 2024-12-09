from flask import Blueprint, request, jsonify
from app.models import Favorite, db

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('', methods=['GET'])
def get_favorites():
    # Replace `user_id` with logic for retrieving the current user's ID (e.g., from session or token).
    user_id = 1  # Example static user_id
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([favorite.to_dict() for favorite in favorites])

@favorites_bp.route('', methods=['POST'])
def add_favorite():
    data = request.json
    favorite = Favorite(
        user_id=1,  # Replace with current user logic
        place_id=data['place_id'],
        name=data['name'],
        category=data.get('category'),
        notes=data.get('notes')
    )
    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.to_dict()), 201

@favorites_bp.route('/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    favorite = Favorite.query.get_or_404(id)
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite deleted successfully"}), 200
