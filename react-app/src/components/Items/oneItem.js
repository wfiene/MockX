import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneItem } from "../../store/items"; 
import AddCart from '../cart/CartModal'
import './items.css'
import { DynamicStar } from 'react-dynamic-star';
import ReviewFormModal from "../CreateReview"

const ItemDetails = () => {
    const sessionUser = useSelector(state => state.session.user)
    const itemObj = useSelector(state => state.items.oneItem)

    const item = Object.values(itemObj)[0]
    let { itemId } = useParams()
    // console.log("--------item-id---------", itemId)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [users, setUsers] = useState([]);
    // const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        dispatch(getOneItem(itemId))
            .then(() => setIsLoaded(true))
    }, [dispatch, itemId])

    // let payload = {
    //     user_id: sessionUser?.id,
    //     item_id: item?.id,
    //     quantity: quantity,
    //     total: item?.price
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     dispatch(addCartItem(payload))
        
    // }

    let sum = 0;
    item?.reviews?.forEach(review => {
        sum += review.rating
    });

    let average = sum / item?.reviews?.length

    

    return (
        <div id="outer-most-details">
            <div id="item-page">
                <div id="header">
                    <h2>{item?.name}</h2>
                    {item?.reviews && item.reviews.length > 0 ? (
                    <DynamicStar 
                        rating={average}
                        fullStarColor={"black"}
                        width={18}
                        height={30}
                        outlined={true}
                    />
                ) : (
                    <p>No reviews yet</p>
                )}
                </div>
                <div >
                    {item?.image && <img className="detail-image" src={item?.image} />}
                </div>
                <div>
                    <AddCart item={item} sessionUser={sessionUser}/>
                </div>
                <h3>MSRP ${item?.price}</h3>
                {item?.reviews && (
                <div>
                    {item?.reviews.map(review => (
                        <div className="reviews">
                        <DynamicStar 
                        rating={review.rating}
                        fullStarColor={"black"}
                        // emptyStarColor={'lightgrey'}
                        width={18}
                        height={30}

                        outlined={true} 
                        />
                        <div>{review.comment}</div>
                        <h4>-- {review.user}</h4>
                        {/* {users?.map(user => review.userId === user.id ? <h4>{user.username}</h4> : null )} */}
                        </div>
                    ))}
                </div>)}
                <div>
                    <ReviewFormModal />
                </div>
            </div>
            {/* <div className="decoration-side">
                <div className="outline-box">
                    <div className="fake-buttons">
                        <div className="br dfjc no-link">
                            <h3 >Place Bid</h3>
                        </div>
                        
                        <div className="br dfjc gr no-link">
                            <h3 >Buy For ${Math.floor(item?.price * 1.2)}</h3>
                        </div>
                    </div>
                    <h3 className="sf no-link pa">Sell for ${Math.floor(item?.price * 1.1)} or ask for more</h3>
                </div>
                
            </div> */}
        </div>
    )
}



export default ItemDetails