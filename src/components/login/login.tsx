import React from 'react';
import './login.scss';
import { observer } from 'mobx-react';
import rootStore from '../../stores/rootStore';
import SognInPage from './SignInPage/SignInPage';
import LogInPage from './loginPage/LoginPage';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Login = observer( () => {
    const {userLogin, isLogged} = rootStore.loginStore
    return (
        <BrowserRouter>
            {!isLogged
                ?   <span>
                <button><Link to="/loginpage">LogIn</Link></button>
                  <button><Link to="/signinpage">SignIn</Link></button>
               </span>
                :<h1>{`Hello, ${userLogin}`}</h1>
            }
            
            <Switch>
                <Route exact path="/login"></Route>
                <Route path="/loginpage"><LogInPage /></Route>
                <Route path="/signinpage"><SognInPage/></Route>
            </Switch>
         
        </BrowserRouter>
    )
})

export default Login;