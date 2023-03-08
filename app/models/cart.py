from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'cart'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    quantity = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Float, nullable=False)
    
    # users_cart = db.relationship('User', back_populates='user_cart')
    # cart_items = db.relationship('CartItem', back_populates='')
    
    def to_dict(self):
        return{
             'id': self.id,
             'userId': self.user_id,
             'itemId': self.item_id,
             'quantity': self.quantity,
             'total': self.total
        }
       