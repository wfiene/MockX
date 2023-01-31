import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {Modal} from '../Modal/Modal'
import ReviewForm from './ReviewForm';


function ReviewFormModal() {
  const [ showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  
//   const reviews = useSelector(state => state.reviews.spotReviews)

//   const allReviews = Object.values(reviews);

  const currentItemObj = useSelector(state => state.items.oneItem )
  const currentItem = Object.values(currentItemObj)[0]
//   console.log('--------curent-item------', currentItem)
  
  let userItemReview;
  if(sessionUser) userItemReview = (currentItem?.ownerId === sessionUser?.id)
//   console.log('------user item review-------', userItemReview)
//   console.log('----current-item-owner-id------', currentItem.ownerId)
//   console.log('-------user id----------', sessionUser.id)
  let updateReview;
  if(sessionUser) updateReview = currentItem?.reviews?.find(review => review.userId === sessionUser.id)
  return (
    <>
    {!userItemReview && !updateReview && sessionUser && (
      <button className='review-pink-buttons' onClick={() => setShowModal(true)}>Leave Review</button>
    )}
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <ReviewForm setShowModal={setShowModal} />
      </Modal>
    )}
    </>
  )
}

export default ReviewFormModal;