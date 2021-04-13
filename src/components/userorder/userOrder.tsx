import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ITour from '../../interfaces/ITour'
import ITourStore from '../../interfaces/ITourstore'
import rootStore from '../../stores/rootStore'
import './userOrder.tsx'
import UserOrderItem from './userOrderItem/userOrderItem'



const UserOrder = () => {
    const [tours,setTours] = useState<ITourStore[]>([])
    const {user,signOut}  = rootStore.loginStore
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
            user : {user.id}
            <button onClick={()=>signOut()} >Log Out</button>
            {tours.map(el=>{
                return <UserOrderItem tour ={el}/>
            })}
        </div>
    )
}

export default UserOrder