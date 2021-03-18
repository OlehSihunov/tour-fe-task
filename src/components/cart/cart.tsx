import './cart.scss';
import { useState } from 'react';
import rootStore from '../../stores/rootStore';
import { observer } from 'mobx-react';
import ITourStore from '../../interfaces/ITourstore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartOrderItem from './cartOrderItem/cartOrderItem';

const Cart = observer(() => {
  const {user} = rootStore.loginStore;
  const [showModal, setState] = useState(false);
  const { selectedTours, checkoutTours } = rootStore.cartStore;
  const toggleModal = () =>{
    setState(!showModal);
  }
  const closeModel = () => {
    setState(!showModal);
    window.location.reload()

  }
  const onCheckout = () => {
    checkoutTours(user.id);
    toggleModal();
  }
  const filteredTours = selectedTours.filter(el => el.userId === user.id);
  const sumPay = filteredTours.reduce((acc, {price, personCount}) => acc + parseInt(price.replace(/[^\d]/g, ''))*personCount, 0);

  return (
    <div className="cart">
      <div className="modal-component" >
        <button onClick={toggleModal} disabled={!filteredTours.length}>
          {filteredTours.length ? <AddShoppingCartIcon /> : <ShoppingCartIcon />}
        </button>
      </ div>
      {showModal && (
        <div className="modal">
          <div className="modal__background" />
          <div className="modal__modal-in" >
            <header className="modal__modal-in__header">
              <span className="modal__modal-in__title">Cart</span>
              <button onClick={closeModel}>X</button>
            </header>
            <ol className="modal__modal-in__list">
              {filteredTours.map((tour: ITourStore, key: number) => <CartOrderItem key={key} tour={tour} />)}
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