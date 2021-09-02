import React, { useState } from 'react';
import Header from './components/Layout/Header';
import MealList from './components/Meals/MealList';
import MealsSummary from './components/Meals/MealsSummary';
import CartProvider from './store/CartProvider';
import './App.css';

const App = () => {

  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <CartProvider className="App">
      <Header />
      <MealsSummary />
      <MealList />
    </CartProvider>
  );
}

export default App;
