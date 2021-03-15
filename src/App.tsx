import './App.scss';
import {BrowserRouter,Redirect,Route,Switch} from 'react-router-dom';
import Tours from './components/tours/tours';
import Login from './components/login/login';
import Tour from './components/tour/tour';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/header/header';
import rootStore from './stores/rootStore';
import {observer} from 'mobx-react'
uuidv4()

function App() {
  const {isLogged} = rootStore.loginStore
  console.log(isLogged)
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
        <Switch>
          <Route exact path = '/'>
          {isLogged?<Tours/>:<Redirect push to ='/login'/>}
           
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

export default observer(App);
