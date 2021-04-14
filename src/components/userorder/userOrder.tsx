import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ITour from '../../interfaces/ITour'
import ITourStore from '../../interfaces/ITourstore'
import rootStore from '../../stores/rootStore'
import './userOrder.scss'
import UserOrderItem from './userOrderItem/userOrderItem'
import { useHistory } from 'react-router-dom';


const UserOrder = () => {
    const [tours,setTours] = useState<ITourStore[]>([])
    const {user,signOut}  = rootStore.loginStore
    const history = useHistory();
    const getTours = async () => {
        let r = await fetch(`http://localhost:8765/api/tours/users/${user.id}`)
        let tours = await r.json();
        setTours(tours)
        console.log(tours)
    }
    useEffect(()=>{
        getTours()
    },[])
    return(
        <div className ="userOrders">
            <div className ="userOrders__header">
                <button className="userOrders__header__btn" onClick={()=>signOut()} >Log Out</button>
                <span className="userOrder__headers__span">Bought tours</span>
                <button className="userOrders__header__btn" onClick={()=>history.push('/')} >Back</button>
            </div>
            {tours.map(el=>{
                return <UserOrderItem tour ={el}/>
            })}
        </div>
    )
}

export default UserOrder