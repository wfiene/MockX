import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DynamicStar } from 'react-dynamic-star';
import { getReviewByUser, deleteReviewThunk } from '../../store/review'
import { getItems } from "../../store/items";
import EditItemModal from "../EditItems/EditItemModal";
import EditReviewModal from "../EditReview/EditReviewModal";
import './userReview.css'


const UserReviews = () => {
    const reviewObj = useSelector(state => state.reviews.userReviews)
    const itemObj = useSelector(state => state.items.allItems)
    const user = useSelector(state => state.session.user)
    const reviews = reviewObj? Object.values(reviewObj) : null
    const items = Object.values(itemObj)
    const userId = user?.id
    console.log('-----reviews------', reviews)
    console.log('-------items-------', items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReviewByUser(userId))
        dispatch(getItems())
    }, [dispatch])


    if (!reviews.length) {
        return (<h2>Nothing here... try leaving a review!</h2>)
    }
    return (
        <div className="outer-reviews">
            {reviews?.map(review => (
                <div className="review-box">
                    <div>
                    {items?.map(item => item?.id === review?.itemId ?  <div><img className='review-image' src={item.image}></img></div> : null)}
                    </div>
                    <div >
                        <DynamicStar
                            rating={review?.rating}
                            fullStarColor={"black"}
                            // emptyStarColor={'lightgrey'}
                            width={18}
                            height={30}

                            outlined={true}
                        />
                    </div>
                    <div className="review-text">{review.comment}</div>
                    <div>
                        <button onClick={() => dispatch(deleteReviewThunk(review?.id))}>Delete</button>
                        <EditReviewModal reviewId={review?.id} itemId={review?.itemId}/>
                    </div>
                </div>
                
            ))}
        </div>
    )
}

export default UserReviews