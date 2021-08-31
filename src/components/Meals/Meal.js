import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Meal.css';

const Meal = () => {
  return (
    <Container className="meal-container d-flex-row">
      <Row>
        <Col className="meal-group-left">
          <p className="meal-name">Food name</p>
          <em>Description</em>
          <p className="meal-price">Price</p>
        </Col>
        <Col className="meal-group-right">
          <div className="mt-3 d-flex justify-content-end align-items-center">
            <span className="meal-amount">Quantity</span>
            <input className="meal-input" type="number" defaultValue="1"></input>
          </div>
          <div className="d-flex justify-content-end">
            <button className="meal-add-button">+ Add</button>
          </div>
        </Col>
      </Row>
      <div className="meal-line"></div>
    </Container>
  )
};

export default Meal;