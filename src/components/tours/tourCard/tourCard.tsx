import './tourCard.scss';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import ITour from '../../../interfaces/ITour';
import rootStore from '../../../stores/rootStore';
import { observer } from 'mobx-react';

interface ITourCardProps {
  tour:ITour
}

const TourCard = observer(({tour}:ITourCardProps) => {
  const {addNewTour2, selectedTours} = rootStore.cartStore;
  const [isSelected,setSelected ]= useState(!!selectedTours.find(etour => etour.id === tour?.id) )
  const onAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
      if (!isSelected) {
          addNewTour2(tour)
          setSelected(!isSelected)
      } 
    };

  return (
    <Link to={`/tour/${tour.id}`} className="tour-card">
      <img
        src={tour.imageUrl}
        className="tour-card__img" alt = 'tour-card-img' />
      <p className="tour-card__title">{tour.title}</p>
      <p className="tour-card__description">{tour.description}</p>
      <div className="tour-card__footer">
        <button className={`tour-card__footer__add-btn ${isSelected ? 'tour-card__footer__add-btn_selected' : ''}`}
          onClick={onAdd}>{isSelected?'In Cart' : 'Add to cart'}</button>
        <p className="tour-card__footer__price">{tour.price}</p>
      </div>
    </Link>
    );
  }
)

export default TourCard;
