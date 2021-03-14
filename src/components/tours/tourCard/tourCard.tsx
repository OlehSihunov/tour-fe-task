
import './tourCard.scss';
import {Link} from 'react-router-dom';
import ITour from '../../../interfaces/ITour';

const TourCard = ({tour}: {tour: ITour}) => (
  <Link to={`/tour/${tour.id}`} className="tour-card">
    <img
      src={tour.imageUrl}
      className="tour-card__img" />
    <p className="tour-card__title">{tour.title}</p>
    <p className="tour-card__description">{tour.description}</p>
    <p className="tour-card__price">{tour.price}</p>
  </Link>
);

export default TourCard;