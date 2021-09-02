import React from 'react';
import Meal from './Meal';
import Card from '../UI/Card';
import { ListGroup } from 'react-bootstrap';

export const DUMMY_MEALS = [
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

const MealList = () => {

  const list = DUMMY_MEALS.map((meal) => (
    <Meal key={meal.id} meal={meal} />
  ))

  return (
    <Card>
      <ListGroup>
        {list}
      </ListGroup>
    </Card>
  );
};

export default MealList;