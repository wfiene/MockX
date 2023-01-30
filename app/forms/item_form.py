from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField, SelectField
from wtforms.validators import DataRequired, URL

class ItemForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    category = SelectField('Category', choices=['computer parts', 'gaming console', 'shoes', 'watch', 'hats', 'apparel', 'other'], validators=[DataRequired()])
    color = StringField('Color', validators=[DataRequired()])
    image = StringField('Image', validators=[DataRequired(), URL()])
    price = IntegerField('Price', validators=[DataRequired()])
    owner_id = IntegerField('Owner')
    submit = SubmitField('submit')