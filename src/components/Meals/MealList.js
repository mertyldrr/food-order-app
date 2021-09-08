import React, { useState, useEffect } from 'react';
import Meal from './Meal';
import Card from '../UI/Card';
import { ListGroup } from 'react-bootstrap';

const MealList = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch("https://food-order-84b3e-default-rtdb.europe-west1.firebasedatabase.app/meals.json");

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await res.json();

      const mealsArr = [];

      for (const key in resData) {
        mealsArr.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price
        });
      }
      setMeals(mealsArr);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });



  }, []);

  if (isLoading) {
    return (
      <h2 style={{ fontFamily: 'Merienda One', textAlign: 'center' }}>Loading...</h2>
    );
  }

  if (httpError) {
    return (
      <h2 style={{ fontFamily: 'Merienda One', textAlign: 'center', color: 'red' }}>{httpError}</h2>
    );
  }

  const list = meals.map((meal) => (
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