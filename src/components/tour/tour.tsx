import './tour.scss'
import React, {useState}  from 'react'
import {useParams} from 'react-router-dom'
import rootStore from '../../stores/rootStore'
import ITour from '../../interfaces/ITour'

interface IURLParams {
    id: string
}

const Tour = () => {
    const {getTourById} = rootStore.toursStore
    const {addNewTour, selectedTours} = rootStore.cartStore;
    const params :IURLParams = useParams()
    const tour :ITour|undefined =  getTourById(+params.id)
    const [isSelected,setSelected ]= useState(!!selectedTours.find(etour => etour.id === tour?.id) )
    const onAdd = (e: React.MouseEvent<HTMLElement>) => {
        if (!isSelected) {
            addNewTour(tour)
            setSelected(!isSelected)
        } 
      };

    return (

        <div className='tour'>
            <div className ='tour__img'>
            <img src={tour?.imageUrl} alt="tooo"/>
            </div>
            <div className = 'tour__info'>
                <p className="tour__info__title">{tour?.title}</p>
                <p className="tour__info__description">{tour?.description}</p>
                <p className="tour__info__price">Price: {tour?.price} 
                <button className={`tour-card__footer__add-btn ${isSelected ? 'tour-card__footer__add-btn_selected' : ''}`}
          onClick={onAdd}>{isSelected?'In Cart' : 'Add to cart'}</button></p>
            </div>
        </div>
    )
}

export default Tour;