const CREATE_REVIEW = 'review/create'
const DELETE_REVIEW = 'review/delete'
const USER_REVIEWS = 'reviews/userId'
const EDIT_REVIEW = 'review/edit'

const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const getReviewsAction = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
}

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}


export const getReviewByUser = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/reviews`)
    if (res.ok) {
        const reviews = await res.json()
        await dispatch(getReviewsAction(reviews))
        return reviews
    }
}

export const createReviewThunk = (rev) => async dispatch => {
    const response = await fetch('/api/reviews/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rev)
    })
    if (response.ok) {
        const review = await response.json()
        await dispatch(createReviewAction(review))
        return review
    }
    return null
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {

        dispatch(deleteReviewAction(reviewId))
    }
}

export const editReviewThunk = (review) => async (dispatch) => {
    const {id, user_id, item_id, rating, comment} = review
    const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id,
            user_id,
            item_id,
            rating,
            comment
        })
    })
    if (res.ok){
        const data = await res.json()
        await dispatch(editReviewAction(data))
        return data
    }
}


const initialState = {
    userReviews: {},
    itemReviews: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case USER_REVIEWS:
        newState = { ...state,  userReviews:{ ...state.userReviews}}
        let myReviews = {}
        action.reviews.userReviews.forEach(review => {
          myReviews[review.id] = review
        })
  
        newState.userReviews = myReviews
        return newState
  
      case CREATE_REVIEW:
        newState = { ...state }
        newState.itemReviews[action.review.id] = action.review
        newState.userReviews = action.item
        return newState
  
      case DELETE_REVIEW:
        newState = { ...state, userReviews:{ ...state.userReviews}}
  
        delete newState.userReviews[action.reviewId]
        return newState;
        
      case EDIT_REVIEW:
        newState = {...state, userReviews:{...state.userReviews}}
        // newState.itemReviews[action.review.id] = action.review
        newState.userReviews[action.review.id] = action.review 
        return newState 
  
      default:
        return state
    }
  }
  
  export default reviewReducer