import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import { getItems } from "../../store/items"

const GetAllItems = () => {
    const itemObj = useSelector(state => state.items.allItems)
    const items = Object.values(itemObj)
    console.log('----------------Items------------', items)
    const dispatch = useDispatch()

    useEffect (() => {
        dispatch(getItems())
    }, [dispatch])

    return (
        <div id="outer-items">
            <div className="frame">
                {items.map(item => (
                    <div key={item.id}>
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetAllItems