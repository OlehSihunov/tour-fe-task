import React, {useState} from 'react'
import { observer } from 'mobx-react'
import rootStore from '../../stores/rootStore'
import TourCard from './tourCard/tourCard'
import './tours.scss'

const Tours = observer(() => {
    const {getPage,tours} = rootStore.toursStore
    const [page,setPage] = useState(2)
    const [size,setSize] = useState(6)
    const HandlePagination = () => {

    }
    const generatePagination = () => {
        const numberOfPages = tours.length/size
        const links = []
        for(let i = 1; i <=numberOfPages;i++){
            links.push(i)
        }
        return links
    }
    return (
        <div className='tours'>
            <h1>Tours</h1>  
            {getPage(page,size).slice().map(tour =>{
                return <TourCard key = {tour.id} tour = {tour}></TourCard>
            })}
            <p>{generatePagination().map(el => {
                return <span className = {`tours__page-number ${el===page?'tours__page-number_active' : ''}`} onClick = {()=>setPage(el)}>{el}</span>
            })}</p>
        </div>
    )
})

export default Tours