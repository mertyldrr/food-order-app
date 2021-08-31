import React from 'react';
import { Container, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import { IoCartOutline } from "react-icons/io5";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <Navbar className="navbar">
      <Container className="navbar-container">
        <h1 className="navbar-header">ReactMeals</h1>
        <NavbarBrand>
          <NavLink className="navbar-link">
            <IoCartOutline className="navbar-cart-logo" size={50} />
            <h4 className="navbar-cart-text">Your Cart</h4>
            <h4 className="navbar-cart-quantity">5</h4>
          </NavLink>
        </NavbarBrand>
      </Container>
    </Navbar>
  )
};

export default NavigationBar;