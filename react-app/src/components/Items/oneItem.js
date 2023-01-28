import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneItem } from "../../store/items"

const ItemDetails = () => {
    const itemObj = useSelector(state => state.items.oneItem)
    const item = Object.values(itemObj)[0]
    console.log("------------item------------", item)
    let { itemId } = useParams()
    console.log("--------item-id---------", itemId)
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
                    <h2>{item.name}</h2>
                </div>
                <div className="detail-image">
                    {item.image && <img src={item.image} />}
                </div>
            </div>
        </div>
    )
}



export default ItemDetails