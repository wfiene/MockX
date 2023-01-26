from app.models import db, Review, environment, SCHEMA, User, Item

def seed_reviews():
    review1 = Review(
        user_id=1,
        item_id=2,
        rating=5,
        comment='Seller was quick to ship and product was in good shape'
    )
    review2 = Review(
        user_id=3,
        item_id=4,
        rating=4,
        comment='Shoe was slightly worn but in very good condition'
    )
    review3 = Review(
        user_id=2,
        item_id=1,
        rating=4,
        comment='Seller added a high markup to this card'
    )
    review4 = Review(
        user_id=3,
        item_id=1,
        rating=5,
        comment='Product came fast and made my games run super smooth'
    )
    review5 = Review(
        user_id=4,
        item_id=2,
        rating=5,
        comment='Paid a little over msrp but seller shipped it with an extra controller'
    )
    review6 = Review(
        user_id=6,
        item_id=3,
        rating=2,
        comment='Wish I had bought an Xbox instead'
    )
    review7 = Review(
        user_id=5,
        item_id=3,
        rating=5,
        comment='Console came in excelent condition in orginal box'
    )
    review8 = Review(
        user_id=1,
        item_id=4,
        rating=5,
        comment='Shoes came in original box in perfect condition'
    )
    review9 = Review(
        user_id=4,
        item_id=5,
        rating=5,
        comment='Love the classic Wu-Tang look, shoes in perfect condition'
    )
    review10 = Review(
        user_id=6,
        item_id=6,
        rating=5,
        comment='Shoes in perfect condition and make me stand out'
    )
    review11 = Review(
        user_id=4,
        item_id=6,
        rating=3,
        comment='Shoes were in great condition but the size did not fit me even though I ordered my size'
    )
    review12 = Review(
        user_id=3,
        item_id=5,
        rating=5,
        comment='My favorite pair of shoes I own'
    )
    review13 = Review(
        user_id=1,
        item_id=7,
        rating=5,
        comment='Look great and are great in the snow'
    )
    review14 = Review(
        user_id=5,
        item_id=7,
        rating=5,
        comment='Fit perfect and are waterproof and warm'
    )
    review15 = Review(
        user_id=2,
        item_id=8,
        rating=5,
        comment='Minimal but looks clean and needs no maintinence'
    )
    review16 = Review(
        user_id=3,
        item_id=8,
        rating=4,
        comment='Not as flashy as I\'d like but the self winding feature is cool'
    )
    review17 = Review(
        user_id=3,
        item_id=9,
        rating=5,
        comment='Shiny, durable and great price'
    )
    review18 = Review(
        user_id=4,
        item_id=9,
        rating=5,
        comment='Looks great and I can wear it anywhere'
    )
    review19 = Review(
        user_id=5,
        item_id=10,
        rating=5,
        comment='Clean black color with breathable mesh material'
    )
    review20 = Review(
        user_id=6,
        item_id=10,
        rating=5,
        comment='Is easy to wash and is a great active-wear hat'
    )
    
    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19, review20]
    
    for review in reviews:
        db.session.add(review)
        db.session.commit()
    
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()