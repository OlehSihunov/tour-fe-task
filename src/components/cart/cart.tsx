import './cart.scss';
import { useState } from 'react';
import rootStore from '../../stores/rootStore';
import { observer } from 'mobx-react';
import ITourStore from '../../interfaces/ITourstore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartOrderItem from './cartOrderItem/cartOrderItem';
import React from 'react';

const Cart = observer(() => {

    const { user } = rootStore.loginStore;
    const [showModal, setState] = useState(false);
    const { selectedTours, checkoutTours } = rootStore.cartStore;
    const { updateUserBalance } = rootStore.loginStore;
    const toggleModal = () => {
        setState(!showModal);
    }
    const closeModel = () => {
        setState(!showModal);
        window.location.reload()

    }
    const onCheckout = () => {
        checkoutTours(user.id);
        console.log("ONCHECOUT");
        updateUserBalance(user.balance-sumPay);
        toggleModal();
    }
    const filteredTours = selectedTours.filter(el => el.userId === user.id);
    const sumPay = filteredTours.reduce((acc, { price, personCount }) => acc + price * personCount, 0);

    const canPay =(value:number = 0):boolean =>{
        if(user.balance-sumPay-value >0)
            return true
        return false
    }

    return (
        <div className="cart">
            <div className="modal-component" >
                <button onClick={toggleModal} disabled={!filteredTours.length} className="modal-component__btn">
                    {filteredTours.length ? <AddShoppingCartIcon  className="modal-component__btn__icon"/> : <ShoppingCartIcon className="modal-component__btn__icon"/>}
                </button>
            </ div>
            {showModal && (
                <div className="modal">
                    <div className="modal__background" />
                    <div className="modal__modal-in" >
                        <header className="modal__modal-in__header">
                            <span className="modal__modal-in__title">Cart</span>
                            <span className="modal__modal-in__footer__span">Your ballance: {user.balance}$</span>
                            <button onClick={closeModel}>X</button>
                        </header>
                        <ol className="modal__modal-in__list">
                            {filteredTours.map((tour: ITourStore, key: number) => <CartOrderItem key={key} tour={tour} />)}
                        </ol>
                        <div className="modal__modal-in__footer">
                            {!canPay()?
                            <React.Fragment>
                                 <span className="modal__modal-in__footer__span-alert">You can't pay for it</span>
                                 <span className="modal__modal-in__footer__span-alert">{sumPay}$</span>
                            </React.Fragment>
                           :
                           <span className="modal__modal-in__footer__span">{sumPay}$</span>
                            }
                           
                            <button className="modal__modal-in__footer__btn" onClick={onCheckout} disabled={!selectedTours.length||!canPay()}>Buy now</button>
                            

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
);

export default Cart;