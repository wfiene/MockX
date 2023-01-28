from app.models import db, Item, environment, SCHEMA, Review, User

def seed_items():
    rtx_4090 = Item(
        name='Nvidia RTX 4090, founders edition', category='computer parts', color='silver', image='https://cdn.wccftech.com/wp-content/uploads/2022/09/NVIDIA-GeForce-RTX-4090-Graphics-Card-_1-low_res-scale-4_00x-Custom.png', price=1599, owner_id=1
    )
    xbox = Item(
        name='Xbox Series X, pro version', category='gaming console', color='black', image='https://media.wired.com/photos/5fa5dc3dba670daaf8e97a8d/191:100/w_1280,c_limit/games_gear_series-x.jpg', price=499, owner_id=2
    )
    playstation = Item(
        name='Playstation 5, god of war edition', category='gaming console', color='white', image='https://i5.walmartimages.com/asr/fd596ed4-bf03-4ecb-a3b0-7a9c0067df83.bb8f535c7677cebdd4010741c6476d3a.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', price=499, owner_id=3
    )
    jordan = Item(
        name='Jordan 1 Retro High', category='shoes', color='red', image='https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1665691099&q=75', price=300, owner_id=4
    )
    dunk = Item(
        name='Nike Dunk, Black Varsity Maize', category='shoes', color='yellow', image='https://cdn.shoplightspeed.com/shops/655187/files/41556708/nike-nike-dunk-high-black-varsity-maize-size-95-ds.jpg', price=210, owner_id=1
    )
    reebok = Item(
        name='Reebok Kamikaze II', category='shoes', color='orca', image='https://images.stockx.com/images/Reebok-Kamikaze-II-Black-White.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1619737059&q=75', price=121 , owner_id=5
    )
    nike = Item(
        name='Nike Path WNTR, waterproof', category='shoes', color='wheat', image='https://img.eobuwie.cloud/eob_product_512w_512h(1/7/3/4/17345f3aff677978a3a995bb91ae2395c9f22456_0000207720862_01_pa,jpg)/batai-nike-path-wntr-bq4223-700-wheat-wheat-black-cinnamon.jpg', price=110, owner_id=6
    )
    spin = Item(
        name='Spinnaker Cahill, perpetual motion', category='watch', color='silver', image='https://cdn.shopify.com/s/files/1/0074/5432/6835/products/spinnaker-SP-5075-11-Q_1800x1800.jpg?v=1591119501', price=350, owner_id=1
    )
    shock = Item(
        name='G-Shock, waterproof', category='watch', color='black-gold', image='https://www.casio.com/content/dam/casio/product-info/locales/us/en/timepiece/product/watch/G/GA/GA1/GA-110GB-1A/assets/GA-110GB-1A_Seq1.png', price=150, owner_id=2
    )
    hat = Item(
        name='Rebel 8 Mesh trucker cap', category='hats', color='black', image='https://cdn.shopify.com/s/files/1/0239/1371/products/LogoScriptMeshcap_Porduct2.jpg?v=1568853998', price=40, owner_id=3
    )
    
    db.session.add(rtx_4090)
    db.session.add(xbox)
    db.session.add(playstation)
    db.session.add(jordan)
    db.session.add(dunk)
    db.session.add(reebok)
    db.session.add(nike)
    db.session.add(spin)
    db.session.add(shock)
    db.session.add(hat)
    db.session.commit()
    
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items")

    db.session.commit()