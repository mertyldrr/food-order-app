import React from 'react';
import NavigationBar from './components/Layout/NavigationBar';
import Meal from './components/Meals/Meal';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Meal />
      <Meal />
      <Meal />
      <Meal />
      <Meal />
    </div>
  );
}

export default App;
