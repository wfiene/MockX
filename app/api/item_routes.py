from flask import Blueprint, request

from app.forms.item_form import ItemForm
from ..models import db, User, Item, Review

item_bp = Blueprint('items', __name__)

@item_bp.route('')
def item_home():
    all_items = Item.query.all()
    return {'items': [item.to_dict() for item in all_items]}