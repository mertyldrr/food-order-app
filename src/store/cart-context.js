import React from 'react';

const CartContext = React.createContext({
  // for autocompletion purpose
  meals: [],
  totalAmount: 0,
  addMeal: (meal) => {},
  removeMeal: (meal) => {}
})

export default CartContext;