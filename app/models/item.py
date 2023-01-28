from .db import db, environment, SCHEMA, add_prefix_for_prod

class Item(db.Model):
    __tablename__ = 'items'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(40), nullable=False)
    image = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    
    reviews = db.relationship('Review', back_populates='item', cascade='all, delete')
    user = db.relationship('User', back_populates='items')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'color': self.color,
            'image': self.image,
            'price': self.price,
            'ownerId': self.owner_id
        }