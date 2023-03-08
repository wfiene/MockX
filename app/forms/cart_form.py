from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField, SelectField
from wtforms.validators import DataRequired, URL

class CartForm(FlaskForm):
    user_id = IntegerField('user')
    item_id = IntegerField('item')
    quantity = IntegerField('quantity')
    total = IntegerField('total')
    submit = SubmitField('submit')