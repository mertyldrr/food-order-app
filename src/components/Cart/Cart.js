import React, { Fragment, useState, useContext, useRef } from 'react';
import { Modal, Container, Form } from 'react-bootstrap';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import './Cart.css';

const isEmpty = (value) => value.trim() === '';
const isFiveNum = (postalCode) => postalCode.trim().length === 5;

const Cart = ({ showModal, onClickHandler }) => {

  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

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

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("https://food-order-84b3e-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartCtx.meals
        })
      });

      if (!res.ok) {
        setDidSubmit(false);
        throw new Error("Something went wrong!");
      }
      else {
        setDidSubmit(true);
      }
    } catch (error) {
      setHttpError(error.message);
    }
    setIsSubmitting(false);
    cartCtx.clearCart();
  }

  const checkoutHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveNum(enteredPostalCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    if (httpError) {
      return;
    }

    const userData = {
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    };

    submitOrderHandler(userData);

  };


  const list = cartCtx.meals.map((item) => (
    <CartItem
      key={item.id}
      cartItem={item}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));

  const checkoutForm = (
    <Form className="d-flex-row">
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" ref={nameInputRef} />
        {!formInputValidity.name && <p className="error mt-2">Name cannot be empty!</p>}
      </Form.Group>
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Label>Street</Form.Label>
        <Form.Control type="text" ref={streetInputRef} />
        {!formInputValidity.street && <p className="error mt-2">Street cannot be empty!</p>}
      </Form.Group>
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Label>Post Code</Form.Label>
        <Form.Control type="text" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p className="error mt-2">Postal code must be 5 digit</p>}
      </Form.Group>
      <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" ref={cityInputRef} />
        {!formInputValidity.city && <p className="error mt-2">City cannot be empty</p>}
      </Form.Group>
      <Container className="cart-buttons d-flex justify-content-end">
        <button onClick={onClickHandler} className="close">Cancel</button>
        {hasItems && <button type="submit" className="order" onClick={checkoutHandler}>Confirm</button>}
      </Container>
      {httpError && <p className="http-error">{httpError}</p>}
    </Form>
  )

  const modalActions = (
    <Container className="cart-buttons d-flex justify-content-end">
      <button onClick={onClickHandler} className="close">{!isCheckout ? "Close" : "Cancel"}</button>
      {hasItems && <button className="order" onClick={orderHandler}>Order</button>}
    </Container>
  )

  const cartModalContent = (
    <Fragment>
      <Modal.Header closeButton className="d-flex-row modal-header">
        <Modal.Title className="modal-title">Cart Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Container className="modal-list">{list}</Container>
        <Container className="modal-total-price d-flex justify-content-between">
          <div>{"Total Amount:"}</div>
          <div>{totalAmount}</div>
        </Container>
        {isCheckout && checkoutForm}
        {!isCheckout && modalActions}
      </Modal.Body>
    </Fragment>
  )

  const didSubmitModalContent = (
    <Modal.Body>
      <div className="order-success d-flex justify-content-center align-items-center">
        <p>Successfully sent the order!</p>
      </div>
    </Modal.Body>
  )

  return (
    <Modal
      className="modal"
      size="lg"
      show={showModal}
      onHide={onClickHandler}
    >
      {!isSubmitting && !didSubmit && cartModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  )
};

export default Cart;