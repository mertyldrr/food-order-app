import React, { useState, Fragment, useContext } from 'react';
import { Container, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import CartContext from '../../store/cart-context';
import { IoCartOutline } from 'react-icons/io5';
import Cart from '../Cart/Cart';
import mealsImage from '../../assets/meals.jpg';
import "./Header.css";

const Header = () => {

  const [showModal, setShowModal] = useState(false);

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.meals.reduce((curNumber, meal) => {
    return curNumber + meal.quantity;
  }, 0); 

  const onClickHandler = () => {
    setShowModal(!showModal);
  }

  return (
    <Fragment>
      {showModal && <Cart showModal={showModal} onClickHandler={onClickHandler} />}
      <Navbar className="header">
        <Container className="header-container">
          <h1 className="header-header">ReactMeals</h1>
          <NavbarBrand>
            <NavLink className="header-link" onClick={onClickHandler}>
              <IoCartOutline className="header-cart-logo" size={50} />
              <h4 className="header-cart-text">Your Cart</h4>
              <h4 className="header-cart-quantity">{numberOfCartItems}</h4>
            </NavLink>
          </NavbarBrand>
        </Container>
      </Navbar>
      <div className="header-image">
        <img src={mealsImage} alt="meals" />
      </div>
    </Fragment>
  )
};

export default Header;