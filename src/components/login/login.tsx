import React, { useEffect } from 'react';
import './login.scss';
import { observer } from 'mobx-react';
import rootStore from '../../stores/rootStore';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm/SignInForm';
import { useHistory } from 'react-router-dom';

const LoginPage = observer(() => {
    const { addNewUser, signIn, isLogged} = rootStore.loginStore
    const history = useHistory();
    useEffect(()=>{
        console.log("Logged+ "+isLogged)
        if(isLogged)history.push('/')
        console.log("effectLogin")
      },[isLogged]) 
    return (
       <div className="login-wrapper">
           <SignInForm signIn={signIn} isLogged={isLogged}/> 
           <SignUpForm addNewUser={addNewUser}  isLogged={isLogged}/>           
       </div>
    )
})

export default LoginPage;