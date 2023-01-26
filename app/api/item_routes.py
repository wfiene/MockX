from flask import Blueprint, request

from app.forms.item_form import ItemForm
from ..models import db, User, Item, Review

item_bp = Blueprint('items', __name__)

@item_bp.route('')
def item_home():
    all_items = Item.query.all()
    return {'items': [item.to_dict() for item in all_items]}

@item_bp.route('/new', methods=['POST'])
def new_item():
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_item = Item()
        form.populate_obj(new_item)
        
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict()
    
    else:
        return form.errors
    
@item_bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def item_by_id(id):
    item = Item.query.get(id)
    
    if item:
        
        if request.method == "GET":
            item_dict = item.to_dict()
            item_dict['reviews'] = [review.to_dict() for review in item.reviews]
            item_dict['user'] = item.user.to_dict()
            return item_dict
        
        if request.method == "PUT":
            form = ItemForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            
            if form.validate_on_submit():
                item.name = form.data['name']
                item.category = form.data['category']
                item.color = form.data['color']
                item.image = form.data['image']
                item.price = form.data['price']
                db.session.commit()
                return item.to_dict()
            else:
                return form.errors
            
        if request.method == 'DELETE':
            db.session.delete(item)
            db.session.commit()
            return {'message': f'{item.name} Deleted!'}
        
        
    return { "error": "Item not found", "errorCode" : 404 }, 404

@item_bp.route("/<int:id>/reviews")
def get_reviews_by_item(id):
    item = Item.query.get(id)
    
    if item:
        item_reviews = Review.query.filter(Review.item_id == id).all()
        return {'reviews': [review.to_dict() for review in item_reviews]}
    else:
        return { "error": "Item not found", "errorCode" : 404 }, 404