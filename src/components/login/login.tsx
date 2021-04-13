import React, { useEffect, useState } from 'react';
import './login.scss';
import { observer } from 'mobx-react';
import rootStore from '../../stores/rootStore';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm/SignInForm';
import { useHistory } from 'react-router-dom';
import SignInPage from '../signInPage/signInPage';
import SignUpPage from '../signUpPage/signUpPage';

const LoginPage = observer(() => {
    const { addNewUser, signIn, isLogged} = rootStore.loginStore
    const [signInF,setSignInF] = useState(true) 
    const history = useHistory();
    useEffect(()=>{
        console.log("Logged+ "+isLogged)
        if(isLogged)history.push('/')
        console.log("effectLogin")
      },[isLogged]) 
    const switchForm =() => {
        setSignInF(!signInF);
    }
    return (
       <div className="login-wrapper">
           {signInF?
           <SignInPage signIn={signIn} isLogged={isLogged} switchForm ={switchForm} /> 
           :
           <SignUpPage addNewUser={addNewUser}   switchForm ={switchForm} isLogged={isLogged}/>   
            }    
       </div>
    )
})

export default LoginPage;