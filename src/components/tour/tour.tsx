import './tour.scss'
import './tourphoto.scss'
import React, {useEffect, useState}  from 'react'
import {useParams} from 'react-router-dom'
import rootStore from '../../stores/rootStore'
import ITour from '../../interfaces/ITour'

interface IURLParams {
    id: string
}

export async function fetchTour<T>(url:string):Promise<T> {
    const response = await fetch(url);
    const body = await response.json();
    return body;
  }

const Tour = () => {
    const {user} = rootStore.loginStore;
    const {addNewTour, selectedTours} = rootStore.cartStore;
    const params :IURLParams = useParams()
    const [isSelected,setSelected ]= useState(false )
    const [tour,setTour] = useState<ITour>({
        id: 0,
        title: "loading",
        description:"loading",
        price:0,
        imageUrl: ''
      })
    const onAdd = (e: React.MouseEvent<HTMLElement>) => {
        if (!isSelected) {
            addNewTour(tour, user.id)
            setSelected(!isSelected)
        } 
      };

    const getTour = async() => {
        let r = await fetch('http://localhost:8765/api/tours/'+params.id)
        let tour = await r.json();
        setTour(tour)
        setSelected(!!selectedTours.find(etour => etour.id === tour.id&&etour.userId === user.id))
    }
     useEffect( () => {
        getTour()

      },[]);
    return (

        <div className='tour'>
            <p className="tour__title">{tour?.title}</p>
            <div className='container'>
                <div className ='tour__img'>
                    <a className="lightbox" href="#dog">
                        <img src={tour.imageUrl} alt="tooo"/>
                    </a> 
                    <div className="lightbox-target" id="dog">
                        <img src={tour.imageUrl} alt="tooo"/>
                        <a className="lightbox-close" href="#"></a>
                    </div>               
                </div>
                <div className = 'container__info'>
                    <p className="container__info__description">{tour?.description}</p>
                    <p className="container__info__price">Price: {tour?.price} 
                    <button className={`container-card__footer__add-btn ${isSelected ? 'container-card__footer__add-btn_selected' : ''}`}
            onClick={onAdd}>{isSelected?'In Cart' : 'Add to cart'}</button></p>
                </div>
            </div>
            
        </div>
    )
}

export default Tour;