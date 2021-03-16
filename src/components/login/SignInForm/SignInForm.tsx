import React, {useState} from 'react';
import { observer } from 'mobx-react';
import { useHistory } from "react-router-dom";
import './SignInForm.scss';
import IUser from '../../../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';

interface  ILoginPageProps{
    signIn:  (newUser: IUser) => void
    isLogged: boolean;
}
const SignInForm = observer(({signIn, isLogged}:ILoginPageProps) => {    
    const [login, setLogin] =useState('');
    const [password, setPassword] =useState('');
    const history = useHistory();
    const handleSignIn = () => {
        if(login === '' || password === ''){
            alert("log and pass err")
            return
        }
        const newUser: IUser = {login, password, id: uuidv4()}
        signIn(newUser)
        if(isLogged){
            history.push('/')
        }
        else {
            alert('Wrong login or pass')
        }
    }

    return(
        <div className="form login-form">
            <form onSubmit={handleSignIn}> 
                    <p className = "form__title">Sign In</p>                   
                    <input className="input" value={login} onChange={(e) => setLogin(e.target.value)}
                    type="text" placeholder="Enter login" /><br />
                    <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" /><br />  
                    <input className="submit-btn" type="submit" value="Sign In"/>
                </form> 
        </div>
    )
})

export default SignInForm