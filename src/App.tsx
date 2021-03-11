import React from 'react';
import './App.scss';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Tours from './components/tours/tours';
import Login from './components/login/login';
import Cart from './components/cart/cart';
import Tour from './components/tour/tour';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path = '/'>
           <Tours/>
          </Route>
          <Route  path = '/login'>
            <Login/>
          </Route>
          <Route  path = '/cart'>
            <Cart/>
          </Route>
          <Route  path = '/tour/id={tourId}'>
           <Tour/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
