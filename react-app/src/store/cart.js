const GET_CART = 'cart/getCart'
const ADD_ITEM = 'cart/addOne'
const UPDATE_ITEM = 'cart/update'
const DELETE_ITEM = 'cart/deleteItem'

//----------- Actions -----------//

export const loadCart = (carts) => {
    return { 
        type: GET_CART,
        carts
    }
}

export const addOneItem = (cart) => {
    return {
        type: ADD_ITEM,
        cart
    }
}

export const updateOne = (cart) => {
    return {
        type: UPDATE_ITEM,
        cart
    }
}

export const deleteItem = (itemId) => {
    return {
        type: DELETE_ITEM,
        itemId
    }
}

//----------- Thunks -----------//

export const getCart = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/cart`)

    if (res.ok) {
        const data = await res.json()
        await dispatch(loadCart(data))
        return data
    }
}

export const addCartItem = (payload) => async (dispatch) => {
    const res = await fetch('/api/cart/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (res.ok){
        const data = await res.json()
        await dispatch(addOneItem(data))
        return data
    }
}

export const updateCartItem = (cart) => async (dispatch) => {
    const res = await fetch(`/api/cart/${cart.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
    });
    if (res.ok) {
        const data = await res.json()
        await dispatch(updateOne(data))
        return data
    }
}

export const deleteCartItem = (cartId) => async (dispatch) => {
    const res = await fetch(`/api/cart/${cartId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        await dispatch(deleteItem(cartId))
    }
}

//----------- Reducer ------------//

const initialState = {cartItems: {}, oneCartItem: {}}
const cartReducer = (state = initialState, action) => {
    let newState
    switch (action.type){
        case GET_CART:
            {
                newState = {...state, cartItems: { ...state.cartItems}}
                action.carts.carts.forEach(cart => {
                    newState.cartItems[cart.id] = cart
                })
                return newState
            }
        case ADD_ITEM:
            {
                newState = {...state}
                newState.cartItems = {...state.cartItems}
                newState.cartItems[action.cart.id] = action.cart
                newState.oneCartItem = action.cart
                return newState
            }
        case UPDATE_ITEM:
            {
                newState = {cartItems: {...state.cartItems}, oneCartItem: {...state.oneCartItem}}
                newState.cartItems[action.cart.id] = action.cart
                newState.oneCartItem[action.cart.id] = action.cart
                return newState
            }
        case DELETE_ITEM:
            {
                newState = {cartItems: {...state.cartItems}, oneCartItem: {...state.oneCartItem}}
                delete newState.cartItems[action.itemId]
                delete newState.oneCartItem[action.itemId]
                return newState
            }
        default:
            return state
    }
}

export default cartReducer