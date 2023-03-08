import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../Modal/Modal";
import AddCartForm from "./CartForm";
import { getCart } from "../../store/cart";


function AddCart({item}) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const cartObj = useSelector(state => state.carts.cartItems)
    const carts = cartObj ? Object.values(cartObj) : null

    useEffect(() => {
        dispatch(getCart(sessionUser.id))
    }, [dispatch])

    let userCarts;
    if (sessionUser) userCarts = carts?.find(cart => cart.itemId === item?.id)

    return (
        <>
            {!userCarts && sessionUser && (
                <button onClick={() => setShowModal(true)}>Add to Cart</button>
            )}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddCartForm setShowModal={setShowModal} sessionUser={sessionUser} item={item} />
                </Modal>
            )}
        </>
    )
}

export default AddCart