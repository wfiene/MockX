from flask import Blueprint, request

from app.forms.cart_form import CartForm
from ..models import db, User, Item, Cart

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/new', methods=['POST'])
def new_cart_item():
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    

    if form.validate_on_submit():
        new_cart = Cart()
        form.populate_obj(new_cart)
        item = Item.query.get(new_cart.item_id)
        new_cart.total = form.data['quantity'] * item.price
        
        db.session.add(new_cart)
        db.session.commit()
        return new_cart.to_dict()
    else:
        return form.errors
    # total_price = item.price * quantity
    # cart = Cart(user_id=current_user.id, item_id=item_id, quantity=quantity, total_price=total_prcie)
    # db.session.add(cart)
    # db.session.commit()
    

@cart_bp.route('/<int:id>', methods=['DELETE', 'PUT'])
def change_cart_item(id):
    
    cart = Cart.query.get(id)
    
    if cart:
        item = Item.query.get(cart.item_id)
    
    if request.method == 'DELETE':
        db.session.delete(cart)
        db.session.commit()
        return {'message': 'item deleted'}
        
    if request.method == 'PUT':
        form = CartForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        
        if form.validate_on_submit():
            # cart.user_id = form.data['user_id']
            # cart.item_id = form.data['item_id']
            cart.quantity = form.data['quantity']
            cart.total = form.data['quantity'] * item.price
            # if form.data['quantity'] == 0:
            #     db.session.delete(cart)
            #     db.session.commit
            db.session.commit()
            return cart.to_dict()
        else:
            return form.errors
            