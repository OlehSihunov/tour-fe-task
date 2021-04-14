import React from 'react'
import { NavLink } from "react-router-dom";
import './header.scss'
import rootStore from '../../stores/rootStore';
import { observer } from 'mobx-react';
import Cart from '../cart/cart';
import PersonIcon from '@material-ui/icons/Person';

const Header = observer(() => {
    const {user,signOut}  = rootStore.loginStore
    
    return (
        <div className = 'header'>
            <NavLink to ='/'><span className = 'header__title '>Tours.</span></NavLink>
            
            {!user.login?
                 null
                : 
                <span className = 'header__user'>
                        <NavLink to = {`/usertours/`+user.id} className ="user__link">
                            <PersonIcon className="user__icon"/>
                            <strong>{user.login}</strong>
                        </NavLink>
                        <strong>{user.balance}$</strong>
                        <Cart></Cart>
                </span>
            }
        </div>
    )
}) 

export default Header;