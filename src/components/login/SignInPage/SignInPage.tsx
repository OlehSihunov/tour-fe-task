import React from 'react';
import { observer } from 'mobx-react-lite';
import loginStore from '../../../stores/rootStore';
import './SignInForm.scss'
import rootStore from '../../../stores/rootStore';

const SignInPage = observer(() => {
    const {userLogin, userPassword, isLogged, logouting, setUserLoginValue, setUserPasswordValue, signInSubmit} = rootStore.loginStore
    return (
        <div>
            {!isLogged
                ? <form onSubmit={signInSubmit} className="login-form">
                    <input value={userLogin} onChange={setUserLoginValue} type="text" placeholder="Enter login" /><br />
                    <input value={userPassword} onChange={setUserPasswordValue} type="password" placeholder="Enter password" /><br />  
                    <input type="submit" value="SignIn"/>                 
                </form>
                : <button onClick={() => logouting()}>LogOut</button>
            }
            {isLogged ? <h1>{`Hello, ${userLogin}`}</h1> : true}
            {  }
        </div>
    )
})

export default SignInPage;