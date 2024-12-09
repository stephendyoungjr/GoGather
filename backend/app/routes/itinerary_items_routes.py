from flask import Blueprint, request, jsonify
from app.models import ItineraryItem, db

itinerary_items_bp = Blueprint('itinerary_items', __name__)

@itinerary_items_bp.route('/<int:itinerary_id>/items', methods=['GET'])
def get_itinerary_items(itinerary_id):
    items = ItineraryItem.query.filter_by(itinerary_id=itinerary_id).all()
    return jsonify([item.to_dict() for item in items])

@itinerary_items_bp.route('/<int:itinerary_id>/items', methods=['POST'])
def add_itinerary_item(itinerary_id):
    data = request.json
    item = ItineraryItem(
        itinerary_id=itinerary_id,
        place_id=data['place_id'],
        name=data['name'],
        start_time=data['start_time'],
        end_time=data['end_time']
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@itinerary_items_bp.route('/<int:id>', methods=['PUT'])
def update_itinerary_item(id):
    item = ItineraryItem.query.get_or_404(id)
    data = request.json
    item.name = data.get('name', item.name)
    item.start_time = data.get('start_time', item.start_time)
    item.end_time = data.get('end_time', item.end_time)
    db.session.commit()
    return jsonify(item.to_dict()), 200

@itinerary_items_bp.route('/<int:id>', methods=['DELETE'])
def delete_itinerary_item(id):
    item = ItineraryItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Itinerary item deleted successfully"}), 200
