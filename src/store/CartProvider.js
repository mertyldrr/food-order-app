import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  meals: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD_MEAL') {
      const existingCartMealIndex = state.meals.findIndex(
        meal => meal.id === action.meal.id
      );
      const existingCartMeal = state.meals[existingCartMealIndex];
      let updatedMeals;

      if (existingCartMeal) {
        const updatedMeal = {
          ...existingCartMeal,
          quantity: existingCartMeal.quantity + action.meal.quantity
        };
        updatedMeals = [...state.meals];
        updatedMeals[existingCartMealIndex] = updatedMeal;
      }

      else {
        updatedMeals = state.meals.concat(action.meal);
      }

      const updatedTotalAmount = state.totalAmount + action.meal.price * action.meal.quantity;
      return {
        meals: updatedMeals,
        totalAmount: updatedTotalAmount
      };
  }
  return defaultCartState;
};

const CartProvider = ({ children }) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addMealHandler = meal => {
    dispatchCartAction({type: 'ADD_MEAL', meal: meal})
  };

  const removeMealHandler = id => {
    dispatchCartAction({type: 'REMOVE_MEAL', id: id})
  };

  const cardContext = {
    meals: cartState.meals,
    totalAmount: cartState.totalAmount,
    addMeal: addMealHandler,
    removeMeal: removeMealHandler
  }

  return (
    <CartContext.Provider value={cardContext}>
      {children}
    </CartContext.Provider>
  )
};

export default CartProvider;