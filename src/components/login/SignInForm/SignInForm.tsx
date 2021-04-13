import React, { useState } from 'react'
import {Button} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './signInForm.scss'
import Styles from '../../stylesMUI/stylesMUI';
import IUser from '../../../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Email } from '@material-ui/icons';

interface  ILoginPageProps{
    signIn:  (newUser: IUser) => void
    isLogged: boolean,
    switchForm: ()=>void
}
const SignInPage = observer(({signIn, isLogged,switchForm}:ILoginPageProps)  => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const history = useHistory();
    const handleSubmit = () => {
      !login ? setLoginError(true) : setLoginError(false)
      !password  ?setPasswordError(true) : setPasswordError(false)
      if(login&&password){
        const newUser: IUser = {login, password, id: uuidv4(),balance:2000}
        signIn(newUser)        
        setLogin("");
        setPassword("")
        history.push('/')
      }
       
    }


    const handleLogin = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        !e.target.value ? setLoginError(true) : setLoginError(false)
    }
    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        !e.target.value ? setPasswordError(true) : setPasswordError(false)
    }

    const classes  = Styles()
    return(
        <div className = "form-wrapper">
        <div className = 'login-form' id = 'login-form'>
                    <h1>Sign In</h1>
                    <FormControl variant="outlined"
                     className={classes.textField}
                     error ={loginError}>
                        <InputLabel htmlFor="component-outlined" 
                        className={classes.inputLabel} 
                        >Login</InputLabel>
                        <OutlinedInput id="component-outlined"
                        value={login} 
                        className={classes.inputField} 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => handleLogin(e)} 
                        label="Login" 
                        aria-describedby="component-error-login-text"/>
                        <FormHelperText id="component-error-login-text">{loginError ? 'Login Required':`\ `}</FormHelperText>
                    </FormControl>
                    <FormControl variant="outlined"
                    className={classes.textField}
                    error ={passwordError} >
                        <InputLabel htmlFor="component-outlined-password">Password</InputLabel>
                        <OutlinedInput id="component-outlined-password" 
                        value={password}   
                        type = "password"
                        className={classes.inputField} 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => handlePassword(e)} 
                        label="Password" 
                        aria-describedby="component-error-password-text"/>
                        <FormHelperText id="component-error-password-text">{passwordError ? 'Password Required' : `\ `}</FormHelperText>
                    </FormControl>
                    <Button 
                    className = {` ${classes.btn} ${passwordError||loginError ? classes.btnDis : classes.btnAct}`} 
                    size ='large' onClick = { () => handleSubmit()}
                    >Sign In</Button>
                    <p>Don’t have an account yet? <span onClick={()=> switchForm()}>Sign Up</span></p>
        </div>
        </div>
    )
})

export default SignInPage;