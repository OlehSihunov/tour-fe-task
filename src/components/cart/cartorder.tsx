import './cart.scss';
import rootStore from '../../stores/rootStore';
import { observer } from 'mobx-react';
import ITourStore from '../../interfaces/ITourstore';


const CartOrder = observer(({ tour: { id, title, imageUrl, price, personCount } }: { tour: ITourStore }) => {
  const {removePerson, addPerson, removeTour} = rootStore.cartStore;
  const onRemoveTour = () => {
    removeTour(id);
  }
  const onAddPerson = () => {
    addPerson(id);
  };
  const onRemovePerson = () => {
    removePerson(id);
  };
  const varPrice = parseInt(price.replace(/[^\d]/g, ''));
  const endedPrice = personCount * varPrice;

  return (
    <li className="modal-in__container">
      <img src={imageUrl} className="modal-in__container__img" />
      <span className="modal-in__container__title">{title}</span>
      <div className="modal-in__container__counter">
        <button className="modal-in__container__counter__btn" onClick={onRemovePerson} disabled={personCount===1}>-</button>
        <span className="modal-in__container__counter__span">{personCount}</span>
        <button className="modal-in__container__counter__btn" onClick={onAddPerson}>+</button>
      </div>
      <div className="modal-in__container__res">
        <button className="modal-in__container__res__btn" onClick={onRemoveTour}>Delete tour</button>
        <span className="modal-in__container__res__span">{endedPrice}$</span>
      </div>
    </li>
  );
}
);

export default CartOrder;