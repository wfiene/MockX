import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createReviewThunk } from '../../store/review';
import { getOneItem } from '../../store/items';

const ReviewForm = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const { itemId } = useParams()
    const user = useSelector(state => state.session.user)

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1)
    const [validationErrors, setValidationErrors] = useState([])
    const [errors, setErrors] = useState(false)

    const updateReview = (e) => setReview(e.target.value)
    const updateRating = (e) => setRating(e.target.value)

    useEffect(() => {
        const errors = []
        if (review.length > 500) errors.push('Review can not be longer than 500 characters')
        if (!itemId) errors.push('Item couldn\'t be found')
        setValidationErrors(errors)
    }, [review, itemId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(true)

        if (!validationErrors.length) {
            const payload = {
                user_id: user.id,
                item_id: itemId,
                rating: rating,
                comment: review
            }


            let newReview = await dispatch(createReviewThunk(payload))

            if (newReview) {
                await dispatch(getOneItem(itemId))
                setShowModal(false)
                setErrors(false)
            }
        }
    }

    return (
        <div>
            <h3>Leave a review</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea
                            type='text'
                            placeholder='tell us about this item'
                            value={review}
                            onChange={updateReview}
                        />

                        <div>
                            <label>★</label>
                            <input
                                type='number'
                                min='1'
                                max='5'
                                value={rating}
                                onChange={updateRating}
                            />
                        </div>
                        <button type='submit'>Submit Review</button>
                    </div>
                </form>
                <ul>
                    {errors && validationErrors.length > 0 && validationErrors.map(error => (
                        <li className='review-error-messages' key={error}>{error}</li>))}
                </ul>
            </div>
        </div>
    )
}

export default ReviewForm