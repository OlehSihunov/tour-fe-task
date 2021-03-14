import { observer } from 'mobx-react'
import rootStore from '../../stores/rootStore'
import TourCard from './tourCard/tourCard'
const Tours = observer(() => {
    const {tours} = rootStore.toursStore
    return (
        <div className='tours'>
            <h1>Tours</h1>
            {tours.slice().map(tour =>{
                return <TourCard key = {tour.id} tour = {tour}></TourCard>
            })}
        </div>
    )
})

export default Tours