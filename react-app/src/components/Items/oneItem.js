import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneItem } from "../../store/items"
import './items.css'

const ItemDetails = () => {
    const itemObj = useSelector(state => state.items.oneItem)
    const item = Object.values(itemObj)[0]
    console.log("------------item------------", item)
    let { itemId } = useParams()
    // console.log("--------item-id---------", itemId)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getOneItem(itemId))
            .then(() => setIsLoaded(true))
    }, [dispatch, itemId])


    return (
        <div id="outer-most-details">
            <div id="item-page">
                <div id="header">
                    <h2>{item?.name}</h2>
                </div>
                <div >
                    {item?.image && <img className="detail-image" src={item?.image} />}
                </div>
                <h3>${item?.price}</h3>
            </div>
            <div className="decoration-side">
                <div className="outline-box">
                    <div className="fake-buttons">
                        <div className="br dfjc no-link">
                            <h3 >Place Bid</h3>
                        </div>
                        <div className="br dfjc gr no-link">
                            <h3 >Buy For ${Math.floor(item?.price * 1.2)}</h3>
                        </div>
                    </div>
                    <h3 className="sf no-link">Sell for ${Math.floor(item?.price * 1.1)} or ask for more</h3>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}



export default ItemDetails