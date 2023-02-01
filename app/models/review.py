from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))
    
    user = db.relationship('User', back_populates='reviews')
    item = db.relationship('Item', back_populates='reviews')
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'itemId': self.item_id,
            'rating': self.rating,
            'comment': self.comment,
        }
        
    def to_dict_two(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'itemId': self.item_id,
            'rating': self.rating,
            'comment': self.comment,
            'author': self.user.to_dict()
        }