import './cart.scss';
import { useState } from 'react';
import rootStore from '../../stores/rootStore';
import { observer } from 'mobx-react';
import ITourStore from '../../interfaces/ITourstore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartOrder from './cartorder';

const Cart = observer(() => {
  const [showModal, setState] = useState(false);
  const { selectedTours, checkoutTours } = rootStore.cartStore;
  const toggleModal = () =>{
    setState(!showModal);
  }
  const onCheckout = () => {
    checkoutTours();
  }

  return (
    <div className="cart">
      <div className="modalComponent" >
        <button onClick={toggleModal}>
          {selectedTours.length ? <AddShoppingCartIcon /> : <ShoppingCartIcon />}
        </button>
      </ div>
      {showModal && (
        <div className="modal">
          <div className="modal__background" />
          <div className="modal-in" >
            <header>
              <span className="modal-in__title">Cart</span>
              <button onClick={toggleModal}>X</button>
            </header>
            {selectedTours.map((tour: ITourStore, key: number) => <CartOrder key={key} tour={tour} />)}
            <div className="modal-in__footer">
              <span className="modal-in__footer__span">endedPrice</span>
              <button className="modal-in__footer__btn" onClick={onCheckout}>Buy now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
);

export default Cart;