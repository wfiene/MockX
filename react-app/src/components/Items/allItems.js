import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import { getItems, clearItem } from "../../store/items"
import ImageBanner from "../Banner/Banner"
import './items.css'

const GetAllItems = () => {
    const itemObj = useSelector(state => state.items.allItems)
    const items = Object.values(itemObj)
    // console.log('----------------Items------------', items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])

    return (
        <>
        <ImageBanner />
        <div id="outer-items">
            <div className="frame">
                {items.map(item => (
                    <div onClick={dispatch(clearItem)} key={item?.id}>
                        <NavLink className='pt' to={`/items/${item?.id}`} >
                            <div className="item-card">
                                <div>
                                    <img className="item-image" src={item?.image} />
                                </div>
                                <div className="m20">{item?.name}</div>
                                <div className="m20">${item?.price}</div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default GetAllItems