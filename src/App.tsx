import './App.scss';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import { observer } from 'mobx-react';
import Tours from './components/tours/tours';
import Login from './components/login/login';
import Tour from './components/tour/tour';
import { v4 as uuidv4 } from 'uuid';
uuidv4()

function App() {

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
          <Route  path = '/tour/:id'>
           <Tour/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
