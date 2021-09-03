import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './CartItem.css';

const CartItem = ({ cartItem, onAdd, onRemove }) => {

  const price = `$${cartItem.price.toFixed(2)}`;

  return (
    <Container className="meal-container d-flex-row">
      <Row>
        <Col sm={2} className="cart-group-left-col">
          <p className="cart-meal-name">{cartItem.name}</p>
          <p className="meal-price">{price}</p>
        </Col>
        <Col sm={1} className="cart-group-middle-col">
          <div className="mt-3 d-flex justify-content-end align-items-center">
            <span>
              <button
                className="cart-quantity-value"
                type="text"
              >
                {`x${cartItem.quantity}`}
              </button>
            </span>
          </div>
        </Col>
        <Col sm={9}>
          <div className="cart-group-right-col d-flex justify-content-end">
            <button className="cart-button-group" onClick={onAdd}> + </button>
            <button className="cart-button-group" onClick={onRemove}> - </button>
          </div>
        </Col>
      </Row>
      <div className="cart-line"></div>
    </Container>
  )
};

export default CartItem;