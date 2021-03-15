import './tourCard.scss';
import {Link} from 'react-router-dom';
import ITour from '../../../interfaces/ITour';
import rootStore from '../../../stores/rootStore';
import { observer } from 'mobx-react';
import ITourStore from '../../../interfaces/ITourstore';


const TourCard = observer(({tour: {id, title, imageUrl, description, price}}: {tour: ITour}) => {
  const {addNewTour, selectedTours} = rootStore.cartStore;
  const {isLogged} = rootStore.loginStore;
  const isSelected = !!selectedTours.find(tour => tour.id === id)
  const onAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if(!isLogged){
      console.log(isLogged)
      alert("You need to log in first")
      return;
    }
    if (isSelected) {
      addNewTour([...selectedTours].filter(tour => tour.id !== id));
    } else {
      const selectedTour: ITourStore = {
        id,
        title,
        price,
        imageUrl,
        personCount: 1,
        description
      };
      addNewTour([...selectedTours, selectedTour]);
    }
  };

  return (
    <Link to={`/tour/${id}`} className="tour-card">
      <img
        src={imageUrl}
        className="tour-card__img" alt = 'tour-card-img' />
      <p className="tour-card__title">{title}</p>
      <p className="tour-card__description">{description}</p>
      <div className="tour-card__footer">
        <button className={`tour-card__addBtn${isSelected ? 'Selected' : ''}`}
          onClick={onAdd}>Buy</button>
        <p className="tour-card__price">{price}</p>
      </div>
    </Link>
    );
  }
)

export default TourCard;
