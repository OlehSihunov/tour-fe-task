import './cartOrderItem.scss';
import rootStore from '../../../stores/rootStore';
import { observer } from 'mobx-react';
import ITourStore from '../../../interfaces/ITourstore';


const CartOrderItem = observer(({ tour: { id, title, imageUrl, price, personCount, userId } }: { tour: ITourStore }) => {
  const {removePerson, addPerson, removeTour} = rootStore.cartStore;
  const onRemoveTour = () => {
    removeTour(id,userId);
  }
  const onAddPerson = () => {
    addPerson(id, userId);
  };
  const onRemovePerson = () => {
    removePerson(id, userId);
  };
  const varPrice = parseInt(price.replace(/[^\d]/g, ''));
  const endedPrice = personCount * varPrice;

  return (
    <div className="modal-in__container">
      <img src={imageUrl} className="modal-in__container__img" alt = 'cartholder img'/>
      <span className="modal-in__container__title">{title}</span>
      <div className="modal-in__container__counter">
        <button className="modal-in__container__counter__btn modal-in__container__counter__btn_decreace" onClick={onRemovePerson} disabled={personCount===1}>-</button>
        <span className="modal-in__container__counter__span">{personCount}</span>
        <button className="modal-in__container__counter__btn modal-in__container__counter__btn_increace" onClick={onAddPerson}>+</button>
      </div>
      <div className="modal-in__container__res">
        <span className="modal-in__container__res__span">{endedPrice}$</span>
        <button className="modal-in__container__res__btn" onClick={onRemoveTour}>Delete tour</button>
      </div>
    </div>
  );
}
);

export default CartOrderItem;