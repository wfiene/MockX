from flask import Blueprint, request

from app.forms.review_form import ReviewForm
from ..models import db, User, Item, Review

review_bp = Blueprint('reviews', __name__)


@review_bp.route('/new', methods=["POST"])
def new_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_review = Review()
        form.populate_obj(new_review)
        
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    else:
        return form.errors

@review_bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def review_by_id(id):
    review = Review.query.get(id)
    
    if review:
        
        if request.method == "GET":
            review_dict = review.to_dict()
            return review_dict
        
        if request.method == "PUT":
            form = ReviewForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            
            if form.validate_on_submit():
                review.rating = form.data['rating']
                review.comment = form.data['comment']
                db.session.commit()
                return review.to_dict()
            return form.errors
        
        if request.method == "DELETE":
            db.session.delete(review)
            db.session.commit()
            return {'messgae': "Message deleted"}
        
    return { "error": "Review not found", "errorCode" : 404 }, 404  
    