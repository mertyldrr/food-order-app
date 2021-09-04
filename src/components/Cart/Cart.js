import React, { useContext } from 'react';
import { Modal, Container } from 'react-bootstrap';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import './Cart.css';

const Cart = ({ showModal, onClickHandler }) => {

  const cartCtx = useContext(CartContext);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.meals.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeMeal(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addMeal({...item, quantity: 1})
  };

  const list = cartCtx.meals.map((item) => (
    <CartItem 
    key={item.id} 
    cartItem={item} 
    onAdd={cartItemAddHandler.bind(null, item)} 
    onRemove={cartItemRemoveHandler.bind(null, item.id)} 
    />
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
        <Container className="modal-list">{list}</Container>
        <Container className="modal-total-price d-flex justify-content-between">
          <div>{"Total Amount:"}</div>
          <div>{totalAmount}</div>
        </Container>
        <Container className="cart-buttons d-flex justify-content-end">
          <button onClick={onClickHandler} className="close">Close</button>
          {hasItems && <button className="order">Order</button>}
        </Container>
      </Modal.Body>
    </Modal>
  )
};

export default Cart;