import React, {useState} from "react";
import { Modal } from "../Modal/Modal";
import CreateItemForm from "./ItemForm";

function CreateItemModal({item}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button onClick={() => setShowModal(true)}>List an Item</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateItemForm setShowModal={setShowModal}/>
          </Modal>
        )}
        </>
      )

}

export default CreateItemModal