import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Cart = ({ showModal, onClickHandler }) => {

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={onClickHandler}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Test
      </Modal.Body>
    </Modal>
  )
};

export default Cart;