import './tour.scss'
import {useParams} from 'react-router-dom'
import rootStore from '../../stores/rootStore'
import ITour from '../../interfaces/ITour'

interface IURLParams {
    id: string
}

const Tour = () => {
    const {getTourById} = rootStore.toursStore
    const params :IURLParams = useParams()
    const tour :ITour|undefined =  getTourById(+params.id)
    return (

        <div className='tour'>
        <img src={tour?.imageUrl}  className="tour-card__img" alt="tooo"/>
        <p className="tour-card__title">{tour?.title}</p>
        <p className="tour-card__description">{tour?.description}</p>
        <p className="tour-card__price">{tour?.price}</p>
        </div>
    )
}

export default Tour;