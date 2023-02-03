import React, {useState} from "react";
import { Modal } from "../Modal/Modal";
import CreateItemForm from "./ItemForm";
import './create.css'

function CreateItemModal({item}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className="create-button" onClick={() => setShowModal(true)}>List an Item</div>
        {showModal && (
          <Modal className='modal' onClose={() => setShowModal(false)}>
            <CreateItemForm setShowModal={setShowModal}/>
          </Modal>
        )}
        </>
      )

}

export default CreateItemModal