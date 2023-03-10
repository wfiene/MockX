from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Item, Review, Cart

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/items')
@login_required
def items_by_user_id(id):
    # user = User.query.get(id)
    items = Item.query.filter(Item.owner_id == id).all()
    return {'userItems': [item.to_dict() for item in items]}

@user_routes.route('/<int:id>/reviews')
@login_required
def reviews_by_user_id(id):
    reviews = Review.query.filter(Review.user_id == id).all()
    return {'userReviews': [review.to_dict() for review in reviews]}

@user_routes.route('/<int:id>/cart')
@login_required
def cart_by_user_id(id):
    carts = Cart.query.filter(Cart.user_id == id).all()
    return {'carts': [cart.to_dict() for cart in carts]}