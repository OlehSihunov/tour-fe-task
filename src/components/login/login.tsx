import React from 'react';
import './login.scss';
import { observer } from 'mobx-react';
import rootStore from '../../stores/rootStore';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm/SignInForm';

const LoginPage = observer(() => {
    const { addNewUser, signIn, isLogged} = rootStore.loginStore
    return (
       <div className="login-wrapper">
           <SignInForm signIn={signIn} isLogged={isLogged}/> 
           <SignUpForm addNewUser={addNewUser}/>           
       </div>
    )
})

export default LoginPage;