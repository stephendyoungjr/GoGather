from flask import Blueprint, request, jsonify
from app.models import Review, db

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/current', methods=['GET'])
def get_current_user_reviews():
    user_id = 1  # Replace with logic for current user
    reviews = Review.query.filter_by(user_id=user_id).all()
    return jsonify([review.to_dict() for review in reviews])

@reviews_bp.route('/<int:place_id>', methods=['GET'])
def get_reviews_by_place(place_id):
    reviews = Review.query.filter_by(place_id=place_id).all()
    return jsonify([review.to_dict() for review in reviews])

@reviews_bp.route('', methods=['POST'])
def create_review():
    data = request.json
    review = Review(
        user_id=1,  # Replace with logic for current user
        place_id=data['place_id'],
        rating=data['rating'],
        comment=data['comment']
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

@reviews_bp.route('/<int:id>', methods=['PUT'])
def update_review(id):
    review = Review.query.get_or_404(id)
    data = request.json
    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    db.session.commit()
    return jsonify(review.to_dict()), 200

@reviews_bp.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully"}), 200
