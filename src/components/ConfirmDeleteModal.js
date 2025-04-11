import { Component, Fragment, useEffect, useState,  } from 'react'
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap'

import axios from 'axios'

import { API_URL } from '../constants'

const ConfirmDeleteModal = ({id, resetState}) =>{
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
          Do you really want to delete this medication?
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