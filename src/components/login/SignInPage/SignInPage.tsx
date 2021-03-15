import React, {useState} from 'react';
import { observer } from 'mobx-react';
import { useHistory } from "react-router-dom";
import IUser from '../../../interfaces/IUser';
import rootStore from '../../../stores/rootStore';
import { v4 as uuidv4 } from 'uuid';

interface  ILoginPageProps{
    logining:  (newUser: IUser) => void
}

const LoginPage = observer(({logining}:ILoginPageProps) => {    
    const [login, setLogin] =useState('');
    const [password, setPassword] =useState('');
    const history = useHistory();
    const isLogged = false;
    const signIn = () => {
        if(login === '' || password === ''){
            alert("log and pass err")
            return
        }
        const newUser: IUser = {login, password, id: uuidv4()}
        logining(newUser)
        history.push('/')
    }

    return(
        <div className="login-form">
            <form onSubmit={signIn}>                    
                    <input value={login} onChange={(e) => setLogin(e.target.value)}
                    type="text" placeholder="Enter login" /><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" /><br />  
                    <input type="submit" value="LogIn"/>
                </form>                   
        </div>
    )
})

export default LoginPage