import React, { useRef, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CartContext from '../../store/cart-context';
import './Meal.css';

const Meal = ({ meal }) => {

  const quantityInputRef = useRef();
  const cartCtx = useContext(CartContext);

  const onClickHandler = () => {
    const enteredQuantity = quantityInputRef.current.value;  // returns string no matter what
    const enteredQuantityNumber = +enteredQuantity; // convert to a number

    cartCtx.addMeal({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: enteredQuantityNumber
    });
  };

  const price = `$${meal.price.toFixed(2)}`;

  return (
    <Container className="meal-container d-flex-row">
      <Row>
        <Col className="meal-group-left">
          <p className="meal-name">{meal.name}</p>
          <em className="meal-description">{meal.description}</em>
          <p className="meal-price">{price}</p>
        </Col>
        <Col className="meal-group-right">
          <div className="mt-3 d-flex justify-content-end align-items-center">
            <span className="meal-amount">Quantity</span>
            <input
              ref={quantityInputRef}
              className="meal-input"
              type="number"
              defaultValue="1"
              min="1"
              max="10"
            >
            </input>
          </div>
          <div className="d-flex justify-content-end">
            <button className="meal-add-button" onClick={onClickHandler}>+ Add</button>
          </div>
        </Col>
      </Row>
      <div className="meal-line"></div>
    </Container>
  )
};

export default Meal;