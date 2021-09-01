import React, { useState } from 'react';
import Header from './components/Layout/Header';
import MealList from './components/Meals/MealList';
import MealsSummary from './components/Meals/MealsSummary';
import './App.css';

const App = () => {

  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <div className="App">
      <Header />
      <MealsSummary />
      <MealList />
    </div>
  );
}

export default App;
