import React, {useState} from 'react';
import { observer } from 'mobx-react';
import { useHistory } from "react-router-dom";
import IUser from '../../../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';

interface  ILoginPageProps{
    signIn:  (newUser: IUser) => void
    signOut: () => void
}
const SignInForm = observer(({signIn, signOut}:ILoginPageProps) => {    
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
        history.push('/')
    }

    return(
        <div className="login-form">
            <form onSubmit={handleSignIn}>                    
                    <input value={login} onChange={(e) => setLogin(e.target.value)}
                    type="text" placeholder="Enter login" /><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" /><br />  
                    <input type="submit" value="LogIn"/>
                </form> 
        </div>
    )
})

export default SignInForm