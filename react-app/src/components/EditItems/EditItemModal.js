import React, {useState} from "react";
import { Modal } from "../Modal/Modal";
import EditItemForm from "./EditItem";

function EditItemModal({item}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button onClick={() => setShowModal(true)}>Edit Item</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditItemForm item={item} setShowModal={setShowModal}/>
          </Modal>
        )}
        </>
      )

}

export default EditItemModal
