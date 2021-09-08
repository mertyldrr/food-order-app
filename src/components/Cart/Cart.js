import React, { useState, useContext } from 'react';
import { Modal, Container } from 'react-bootstrap';
import CartItem from './CartItem';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';
import './Cart.css';

const Cart = ({ showModal, onClickHandler }) => {

  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.meals.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeMeal(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addMeal({ ...item, quantity: 1 })
  };

  const orderHandler = () => {
    setIsCheckout(true);
  }

  const checkoutHandler = (e) => {
    e.preventDefault();
    console.log("asda");
  }

  const list = cartCtx.meals.map((item) => (
    <CartItem
      key={item.id}
      cartItem={item}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));

  // const addressForm = (
  //   <Form className="d-flex-row">
  //     <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
  //       <Form.Label>Your Name</Form.Label>
  //       <Form.Control type="text" />
  //     </Form.Group>
  //     <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
  //       <Form.Label>Street</Form.Label>
  //       <Form.Control type="text" />
  //     </Form.Group>
  //     <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
  //       <Form.Label>Post Code</Form.Label>
  //       <Form.Control type="text" />
  //     </Form.Group>
  //     <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  //       <Form.Label>City</Form.Label>
  //       <Form.Control type="text" />
  //     </Form.Group>
  //   </Form>
  // )

  return (
    <Modal
      className="modal"
      size="lg"
      show={showModal}
      onHide={onClickHandler}
    >
      <Modal.Header closeButton className="d-flex-row modal-header">
        <Modal.Title className="modal-title">Cart Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Container className="modal-list">{list}</Container>
        <Container className="modal-total-price d-flex justify-content-between">
          <div>{"Total Amount:"}</div>
          <div>{totalAmount}</div>
        </Container>
        {isCheckout && <Checkout />}
        <Container className="cart-buttons d-flex justify-content-end">
          <button onClick={onClickHandler} className="close">{!isCheckout ? "Close" : "Cancel"}</button>
          {hasItems && <button className="order" onClick={!isCheckout ? orderHandler : checkoutHandler}>{!isCheckout ? "Order" : "Confirm"}</button>}
        </Container>
      </Modal.Body>
    </Modal>
  )
};

export default Cart;