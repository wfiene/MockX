from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, DateField, SelectField, BooleanField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired()])
    comment = StringField('comment', validators=[DataRequired()])
    user_id = IntegerField('user')
    item_id = IntegerField('item')
    submit = SubmitField('submit')