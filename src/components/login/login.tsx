import React from 'react';
import './login.scss';
import { observer } from 'mobx-react';
import rootStore from '../../stores/rootStore';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm/SignInForm';

const LoginPage = observer(() => {
    const { addNewUser, SignIn, SignOut} = rootStore.loginStore
    return (
       <div className="login-wrapper">
           <SignInForm signIn={SignIn} signOut={SignOut}/> 
           <SignUpForm addNewUser={addNewUser}/>           
       </div>
    )
})

export default LoginPage;