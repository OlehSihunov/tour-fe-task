import React from 'react';
import { observer } from 'mobx-react';
import loginStore from '../../../stores/rootStore';
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import rootStore from '../../../stores/rootStore';


const LoginPage = observer(() => {
    const {userLogin, userPassword, isLogged, logouting, setUserLoginValue, setUserPasswordValue, loginSubmit} = rootStore.loginStore
    return(
        <div>
            {!isLogged 
                ? <form onSubmit={loginSubmit} className="login-form">                    
                    <input value={userLogin} onChange={setUserLoginValue} type="text" placeholder="Enter login" /><br />
                    <input value={userPassword} onChange={setUserPasswordValue} type="password" placeholder="Enter password" /><br />  
                    <input type="submit" value="LogIn"/>
                </form>
                    : /*<button onClick={() => logouting()}>LogOut</button>*/
                     <Redirect to="/tour" />
            }
            
            <Route exact path="/">
                </Route>
        </div>
    )
})

export default LoginPage