import React from 'react';
import './login.scss';
import { observer } from 'mobx-react';
import rootStore from '../../stores/rootStore';
import SignUpPage from './SignUpPage/SignUpPage';
import SignInPage from './SignInPage/SignInPage';
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

const SignIn = observer(() => {
    const { addNewUser, logining } = rootStore.loginStore
    return (
       <div className="login-wrapper">
           <SignInPage logining={logining}/>
           <SignUpPage addNewUser={addNewUser}/>           
       </div>
    )
})

export default SignIn;