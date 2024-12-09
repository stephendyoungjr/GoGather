from flask import Blueprint, request, jsonify
from app.models import Itinerary, db

itineraries_bp = Blueprint('itineraries', __name__)

@itineraries_bp.route('', methods=['GET'])
def get_itineraries():
    user_id = 1  # Replace with logic to get current user
    itineraries = Itinerary.query.filter_by(user_id=user_id).all()
    return jsonify([itinerary.to_dict() for itinerary in itineraries])

@itineraries_bp.route('', methods=['POST'])
def create_itinerary():
    data = request.json
    itinerary = Itinerary(
        user_id=1,  # Replace with current user logic
        name=data['name'],
        date=data['date']
    )
    db.session.add(itinerary)
    db.session.commit()
    return jsonify(itinerary.to_dict()), 201

@itineraries_bp.route('/<int:id>', methods=['PUT'])
def update_itinerary(id):
    itinerary = Itinerary.query.get_or_404(id)
    data = request.json
    itinerary.name = data.get('name', itinerary.name)
    itinerary.date = data.get('date', itinerary.date)
    db.session.commit()
    return jsonify(itinerary.to_dict()), 200

@itineraries_bp.route('/<int:id>', methods=['DELETE'])
def delete_itinerary(id):
    itinerary = Itinerary.query.get_or_404(id)
    db.session.delete(itinerary)
    db.session.commit()
    return jsonify({"message": "Itinerary deleted successfully"}), 200
