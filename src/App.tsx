import React, { useEffect } from 'react';
import './App.scss';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import { observer } from 'mobx-react';
import Tours from './components/tours/tours';
import Login from './components/login/login';
import Cart from './components/cart/cart';
import Tour from './components/tour/tour';

import rootStore from './stores/rootStore';

function App() {
  const {getTours} = rootStore.toursStore
  useEffect(()=>{
    getTours()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <header className="header">
            <button><Link to="/login">LogIn</Link></button>
            {/* тут би мала бути logOut коли залогінено */}
        </header>
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
