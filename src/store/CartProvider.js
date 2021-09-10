import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  meals: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD_MEAL') {
    const updatedTotalAmount = state.totalAmount + action.meal.price * action.meal.quantity;

    const existingCartMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.meal.id
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
    } else {
      updatedMeals = state.meals.concat(action.meal);
    }

    return {
      meals: updatedMeals,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'REMOVE_MEAL') {
    const existingCartMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.id
    );

    const existingItem = state.meals[existingCartMealIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedMeals;
    if (existingItem.quantity === 1) {
      updatedMeals = state.meals.filter(item => item.id !== action.id);
    } else {
      const updatedMeal = { ...existingItem, quantity: existingItem.quantity - 1 };
      updatedMeals = [...state.meals];
      updatedMeals[existingCartMealIndex] = updatedMeal;
    }

    return {
      meals: updatedMeals,
      totalAmount: updatedTotalAmount
    }

  }

  if (action.type === 'CLEAR_CART') {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = ({ children }) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addMealHandler = meal => {
    dispatchCartAction({ type: 'ADD_MEAL', meal: meal });
  };

  const removeMealHandler = id => {
    dispatchCartAction({ type: 'REMOVE_MEAL', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
  };

  const cardContext = {
    meals: cartState.meals,
    totalAmount: cartState.totalAmount,
    addMeal: addMealHandler,
    removeMeal: removeMealHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cardContext}>
      {children}
    </CartContext.Provider>
  )
};

export default CartProvider;