import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import './cart.css'

const CartButton = () => {
    const user = useSelector(state => state.session.user)

    return (
        <NavLink  classname='cart-icon' to={`/users/${user.id}/cart`}>
            <img className='button' src='https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/green_shoppictcart_1484336527-1.png' style={{height: 40, width: 40, marginTop: 5, marginRight: 5, zIndex: 1}}/>
        </NavLink>
    )
}

export default CartButton