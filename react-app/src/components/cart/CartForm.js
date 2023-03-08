import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/cart";

const AddCartForm = ({item, sessionUser, setShowModal}) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (e) => setQuantity(e.target.value)

    let payload = {
        user_id: sessionUser?.id,
        item_id: item?.id,
        quantity: quantity,
        total: item?.price
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addCartItem(payload))
        setShowModal(false)
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Select Quantity</label>
            <input 
                type="number"
                min='1'
                max='100'
                value={quantity}
                onChange={updateQuantity}
            />
            <button type='submit'>Add To Cart</button>
            </form>
        </div>
    )
}

export default AddCartForm