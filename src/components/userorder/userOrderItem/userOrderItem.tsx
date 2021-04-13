import React from 'react';
import ITourStore from '../../../interfaces/ITourstore';
import './userOrderItem.scss';

 interface IUserOrderItemProps {
    tour: ITourStore;
}
const UserOrderItem =({tour}:IUserOrderItemProps)=> {
    return(
        <div className="modal-in__container">
            <img src={tour.imageUrl} className="modal-in__container__img" alt = 'cartholder img'/>
            <span className="modal-in__container__title">{tour.title}</span>
            <div className="modal-in__container__counter">
                 <span className="modal-in__container__counter__span">{tour.personCount}</span>
            </div>
            <div className="modal-in__container__res">
                {console.log(tour.price + " "+tour.personCount)}
                <span className="modal-in__container__res__span">{tour.price*tour.personCount}$</span>
            </div>
        </div>
        )
}

export default UserOrderItem;