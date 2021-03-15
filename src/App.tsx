import './App.scss';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import Tours from './components/tours/tours';
import Login from './components/login/login';
import Tour from './components/tour/tour';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/header/header';
uuidv4()

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
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
