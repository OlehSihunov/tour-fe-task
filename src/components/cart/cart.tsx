import './cart.scss';
import { useState, useEffect } from 'react';
import rootStore from '../../stores/rootStore';
import { observer } from 'mobx-react';
import ITourStore from '../../interfaces/ITourstore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartOrderItem from './cartOrderItem/cartOrderItem';

const Cart = observer(() => {
  const [showModal, setState] = useState(false);
  const { selectedTours, checkoutTours } = rootStore.cartStore;
  const toggleModal = () =>{
    setState(!showModal);
  }
  const onCheckout = () => {
    checkoutTours();
    toggleModal();
  }
  const sumPay = selectedTours.reduce((acc, {price}) => acc + parseInt(price.replace(/[^\d]/g, '')), 0);

  return (
    <div className="cart">
      <div className="modalComponent" >
        <button onClick={toggleModal} disabled={!selectedTours.length}>
          {selectedTours.length ? <AddShoppingCartIcon /> : <ShoppingCartIcon />}
        </button>
      </ div>
      {showModal && (
        <div className="modal">
          <div className="modal__background" />
          <div className="modal__modal-in" >
            <header className="modal__modal-in__header">
              <span className="modal__modal-in__title">Cart</span>
              <button onClick={toggleModal}>X</button>
            </header>
            <ol className="modal__modal-in__list">
              {selectedTours.map((tour: ITourStore, key: number) => <CartOrderItem key={key} tour={tour} />)}
            </ol>
            <div className="modal__modal-in__footer">
              <span className="modal__modal-in__footer__span">{sumPay}$</span>
              <button className="modal__modal-in__footer__btn" onClick={onCheckout} disabled={!selectedTours.length}>Buy now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
);

export default Cart;