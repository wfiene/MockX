import React, {useState} from "react";
import { Modal } from "../Modal/Modal";
import EditReviewForm from "./EditReviewForm";

function EditReviewModal({itemId, reviewId}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button onClick={() => setShowModal(true)}>Edit Review</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditReviewForm itemId={itemId} reviewId={reviewId} setShowModal={setShowModal}/>
          </Modal>
        )}
        </>
      )

}

export default EditReviewModal