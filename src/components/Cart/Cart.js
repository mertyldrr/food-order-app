import React from 'react';
import { Modal, Container } from 'react-bootstrap';
import CartItem from './CartItem';
import './Cart.css';

export const DUMMY_CARTMEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const Cart = ({ showModal, onClickHandler }) => {

  const list = DUMMY_CARTMEALS.map((item) => (
    <CartItem key={item.id} cartItem={item} />
  ))

  return (
    <Modal
      className="modal"
      size="lg"
      show={showModal}
      onHide={onClickHandler}
    >
      <Modal.Header closeButton  className="modal-header">
        <Modal.Title className="modal-title">Cart Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body d-flex-row">
        {list}
        <Container className="modal-total-price d-flex justify-content-between">
          <div>{"Total Amount:"}</div>
          <div>€50</div>
        </Container>
        <Container className="cart-buttons d-flex justify-content-end">
          <button onClick={onClickHandler} className="close">Close</button>
          <button className="order">Order</button>
        </Container>
      </Modal.Body>
    </Modal>
  )
};

export default Cart;