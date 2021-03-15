import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';
import rootStore from '../../../stores/rootStore';
import './SignUpForm.scss';
import IUser from '../../../interfaces/IUser';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

interface  ISignUpPageProps{
    addNewUser:  (newUser: IUser) => void
}

const SignUpForm = observer(({addNewUser: IUser}:ISignUpPageProps) => {

    const [login, setLogin] =useState('');
    const [password, setPassword] =useState('');
    const history = useHistory();
    const {addNewUser} = rootStore.loginStore 
    
    const signUp = () => {  
        const newUser: IUser = {login, password, id: uuidv4()}
        setLogin('')
        setPassword('')
        addNewUser(newUser)
        history.push('/')
    }
  
    return (
        <div className="form signup-form">
             <form onSubmit={signUp} className="login-form">
                 <input className="input" value={login} onChange={(e)=>setLogin(e.target.value)} type="text" placeholder="Enter login" /><br />
                 <input className="input" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password" /><br />  
                 <input className="submit-btn" type="submit" value="SignIn"/>                 
             </form>

        </div>
    )
})

export default SignUpForm;