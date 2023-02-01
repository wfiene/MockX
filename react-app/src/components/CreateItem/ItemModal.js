import React, {useState} from "react";
import { Modal } from "../Modal/Modal";
import CreateItemForm from "./ItemForm";
import './create.css'

function CreateItemModal({item}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button className="create-button" onClick={() => setShowModal(true)}>List an Item</button>
        {showModal && (
          <Modal className='modal' onClose={() => setShowModal(false)}>
            <CreateItemForm setShowModal={setShowModal}/>
          </Modal>
        )}
        </>
      )

}

export default CreateItemModal