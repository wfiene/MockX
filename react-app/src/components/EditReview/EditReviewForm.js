import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { editReviewThunk, getReviewByUser } from '../../store/review';
import { DynamicStar } from 'react-dynamic-star';

const EditReviewForm = ({setShowModal, itemId, reviewId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
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
        if (!review) errors.push('Item couldn\'t be found')
        setValidationErrors(errors)
    }, [review, itemId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(true)

        if (!validationErrors.length) {
            const payload = {
                id: reviewId,
                user_id: user.id,
                item_id: itemId,
                rating: rating,
                comment: review
            }


            let newReview = await dispatch(editReviewThunk(payload))

            if (newReview) {
                // dispatch(getReviewByUser(user.id))
                // history.push('/')
                setShowModal(false)
                setErrors(false)
            }
        }
    }
    return (
        <div className='review-form'>
            <div className='review-div'>
            <h3>Edit your review</h3>
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
                        <label className='label2'>
                                <DynamicStar
                                    rating={rating}
                                    fullStarColor={"black"}
                                    // emptyStarColor={'lightgrey'}
                                    width={18}
                                    height={30}

                                    outlined={true}
                                    />
                            </label>
                            <input
                                type='number'
                                min='1'
                                max='5'
                                value={rating}
                                onChange={updateRating}
                            />
                        </div>
                        <button id='rev' type='submit'>Submit Review</button>
                    </div>
                </form>
                <ul>
                    {errors && validationErrors.length > 0 && validationErrors.map(error => (
                        <li className='review-error-messages' key={error}>{error}</li>))}
                </ul>
                </div>
            </div>
        </div>
    )

}

export default EditReviewForm