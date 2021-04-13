import React from 'react'
import { NavLink } from "react-router-dom";
import './header.scss'
import rootStore from '../../stores/rootStore';
import { observer } from 'mobx-react';
import Cart from '../cart/cart';

const Header = observer(() => {
    const {user,signOut}  = rootStore.loginStore
    
    return (
        <div className = 'header'>
            <NavLink to ='/'><span className = 'header__title '>Tours.</span></NavLink>
            <span className = 'header__user'>
                {!user.login?
                 <React.Fragment>
                      <NavLink to ='/login'>Login</NavLink>
                 </React.Fragment>
                : 
                <React.Fragment>
                     <strong>{user.login}</strong>
                     <strong>{user.balance}$</strong>
                     <NavLink to = {`/usertours/`+user.id}>Click</NavLink>
                     <strong onClick ={signOut}>Log Out</strong>
                     <Cart></Cart>
                </React.Fragment>
            }
               
                </span>
        </div>
    )
}) 

export default Header;