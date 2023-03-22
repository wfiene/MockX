import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCart, deleteCartItem, updateCartItem } from "../../store/cart"
import { getItems } from "../../store/items"

const UserCart = () => {
    const cartObj = useSelector(state => state.carts.cartItems)
    const itemObj = useSelector(state => state.items.allItems)
    const user = useSelector(state => state.session.user)
    const carts = cartObj ? Object.values(cartObj) : null
    const items = Object.values(itemObj)
    const userId = user?.id
    const dispatch = useDispatch()
    const [itemId, setItemId] = useState()
    const [quantity, setQuantity] = useState(null)
    const [total, setTotal] = useState()
    const [cartId, setCartId] = useState(null)

    useEffect(() => {
        dispatch(getCart(userId));
        dispatch(getItems());
    }, [dispatch])

    const handleCheckout = () => {
        window.alert('Thanks for your order')
        carts?.forEach(cart => {
            dispatch(deleteCartItem(cart?.id))
        })
        setCartId(null)
        dispatch(getCart(userId))
    }

    const setCart = (num) => setCartId(num)

    const plusQuantity = (num) => setQuantity(num + 1)

    const minusQuantity = (num) => {
        if (num >= 2) {
            setQuantity(num - 1);
        }
        else {
            setQuantity(1)
        }
    }



    const setItem = (num) => setItemId(num)

    const setNewTotal = () => {
        let item = items?.find(item => item?.id === itemId)
        setTotal(item?.price)
    }

    useEffect(() => {
        const update = async () => {
            if (cartId && itemId && quantity) {
                const payload = {
                    id: cartId,
                    user_id: userId,
                    item_id: itemId,
                    quantity: quantity,
                    // total: total ? total : sum,
                };

                await dispatch(updateCartItem(payload));
                console.log('failed')
                console.log('cart id', cartId)
                console.log('item id', itemId)
                console.log('quantity', quantity)
                console.log('total', total)
            }
        };
        update();
    }, [quantity, total, cartId, itemId, userId, dispatch])


    if (!carts.length) {
        return (<h2>Nothing here yet... Try adding something to your cart!</h2>)
    }
    let sum = 0
    carts.forEach(cart => {
        sum += cart?.total
    })
    return (
        <div className="outer">
            <div className="carts-container">
                {carts?.map(cart => (
                    <div className="cart-box">
                        <div className="box-one">
                            {items?.map(item => item?.id === cart?.itemId ? <div className="img-box"><img className='cart-image' src={item?.image}></img></div> : null)}
                            <div className="tidy">
                                <div className="cart-text">
                                    <div>Price: ${cart?.total}</div>
                                    <div>&nbsp;</div>
                                    <div>Quantity: {cart?.quantity}</div>
                                </div>
                                <div id="cart-buttons">
                                    <button onClick={() => {
                                        setCart(cart?.id);
                                        minusQuantity(cart?.quantity);
                                        setItem(cart?.itemId);
                                        setNewTotal();
                                        console.log('minus button')
                                    }}>-</button>
                                    <button onClick={() => {
                                        setCart(cart?.id);
                                        plusQuantity(cart?.quantity);
                                        setItem(cart?.itemId);
                                        setNewTotal();
                                        console.log('plus button')
                                    }}>+</button>
                                    <button onClick={() => dispatch(deleteCartItem(cart?.id, () => {
                                        // Callback function to be executed after deletion is completed
                                        dispatch(getCart(userId));
                                        setCartId(null);
                                    }))}>Delete Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <h2>Total: ${sum}</h2>
                <button onClick={handleCheckout}>Check Out</button>
            </div>
        </div>
    )
}

export default UserCart