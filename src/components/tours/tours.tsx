import React, {useEffect, useState} from 'react'
import { observer } from 'mobx-react'
//import rootStore from '../../stores/rootStore'
import TourCard from './tourCard/tourCard'
import './tours.scss'
import ITour from '../../interfaces/ITour'

const Tours = observer(() => {
    const [tours,setTours] = useState<ITour[]>([])
    const [page,setPage] = useState(1)
    const [size] = useState(20)
    const [sort,setFilter] = useState('asc')
    const [maxPrice,setMaxPrice] =useState(9999)
    const [minPrice,setMinPrice] = useState (0)
    const [pages,setPages] = useState(1);
  
    const getTours = async () => {
        let r = await fetch(`http://desktop-jqb4p2t:8765/api/tours/getPage?page=${page-1}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=price,${sort}`)
        let tours = await r.json();
        console.log(tours)
        setTours(tours.content)
        setPages(tours.totalPages)
    }

    useEffect( () => {
        getTours()

      },[page,sort,minPrice,maxPrice])
    function generatePagination() {
      
        const numberOfPages = pages
        const links = []
        for(let i = 1; i <=numberOfPages;i++){
            links.push(i)
        }
        return links
    }
    return (
        <div className='tours'>
            <h1>Tours</h1>  
            <div className ='tours__sort'>
                <select onChange ={(e)=>setFilter(e.target.value)}>
                    <option value ='asc' >From cheap to expencive</option>
                    <option value = 'desc'>From expencive to cheap</option>
                </select>
                <form>
                    <label>Min price:</label>
                    <input value = {minPrice} onChange = {e=>setMinPrice(parseInt(e.target.value)||0)}></input>
                    <label>Max price:</label>
                    <input value = {maxPrice} placeholder ='max price' onChange = {e=>setMaxPrice(parseInt(e.target.value)||0)}></input>
                </form>
            </div>
        {tours.map(tour =>{
            return <TourCard key = {tour.id} tour = {tour}></TourCard>
        })}
        <p>{generatePagination().map(el => {
            return <span key = {el} className = {`tours__page-number ${el===page?'tours__page-number_active' : ''}`} onClick = {()=>{
                console.log("page "+el);
                setPage(el)}}>{el}</span>
        })}</p>
     </div>
    )
})

export default Tours