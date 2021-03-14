import './tourCards.scss';
import {Link} from 'react-router-dom';
import ITour from '../../../interfaces/ITour';

const TourCard = ({tour}: {tour: ITour}) => (
  <Link to={`/tour/${tour.id}`} className="tourCard">
    <img
      src={tour.imageUrl}
      className="imgTourCard" />
    <p className="titleCard">{tour.title}</p>
    <p className="descriptionCard">{tour.description}</p>
    <p className="priceCard">{tour.price}</p>
  </Link>
);

export default TourCard;

