import React, { Fragment, useState,  } from 'react'
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap'
import { Medication } from '../models/Medication'

import axios from 'axios'
import { API_URL } from '../constants'

interface ConfirmDeleteModalProps {
  id: number; // we have the ID coming in from the parent, so we just have to give it a type.
  name: string; // would be a good idea to have the name of the medication the user is going to delete
  resetState: () => void;
}

const ConfirmDeleteModal = ({id, name, resetState} : ConfirmDeleteModalProps) =>{
  // I originally thought I had to use state to maintain the ID but I don't have to as it is directly passed down from parent component
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(prevModal => !prevModal)

  const deleteMedication = () => {
    axios.delete(`${API_URL}${id}/`).then(() => {
      resetState()
      toggle()
    })
  }

  return(
    <Fragment>
      <Button color='danger' onClick={toggle}>
        Remove
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Do you really want to delete <strong>{name}</strong>?
        </ModalHeader>

        <ModalFooter>
          <Button type='button' onClick={toggle}>
            Cancel
          </Button>
          <Button type='button' color='primary' onClick={deleteMedication}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default ConfirmDeleteModal