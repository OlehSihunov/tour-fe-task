import React, {useEffect, useState} from 'react'
import { observer } from 'mobx-react'
//import rootStore from '../../stores/rootStore'
import TourCard from './tourCard/tourCard'
import './tours.scss'
import ITour from '../../interfaces/ITour'
import Pages from './pagination/pages'

const Tours = observer(() => {
    const [tours,setTours] = useState<ITour[]>([])
    const [page,setPage] = useState(1)
    const [size,setSize] = useState(12)
    const [sort,setFilter] = useState('asc')
    const [maxPrice,setMaxPrice] =useState(9999)
    const [minPrice,setMinPrice] = useState (0)
    const [pages,setPages] = useState(1);
    const [toFilter,setToFilter] = useState(false)

    const getTours = async () => {
        let r = await fetch(`http://localhost:8765/api/tours/getPage?page=${page}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=price,${sort}`)
        let tours = await r.json();
        console.log(tours)
        setTours(tours.content)
        setPages(tours.totalPages)
    }

    useEffect( () => {
        getTours()

    },[page,sort,size,toFilter])

    const filter = () => {
        if(minPrice>maxPrice){
            let temp = maxPrice;
            setMaxPrice(minPrice);
            setMinPrice(temp);
        }
        setPage(0)
        setToFilter(!toFilter)
    }
    return (
        <div className='tours'>
            <h1>Tours</h1>  
            <div className ='tours__sort'>
                <div>
                <select onChange ={(e)=>{
                    setFilter(e.target.value)
                    setPage(0)}}>
                    <option value ='asc' >From cheap to expencive</option>
                    <option value = 'desc'>From expencive to cheap</option>
                </select>
                <select onChange ={(e)=>{
                    setSize(parseInt(e.target.value))
                    setPage(0)
                    }}>
                    <option value ='3' >3</option>
                    <option value = '6'>6</option>
                    <option selected value = '9'>9</option>
                    <option value = '12'>12</option>
                    <option value = '24'>24</option>
                </select>
                </div>
                <div>
                <form>
                    <label>Min price:</label>
                    <input value = {minPrice} onChange = {e=>setMinPrice(parseInt(e.target.value)||0)}></input>
                    <label>Max price:</label>
                    <input value = {maxPrice} placeholder ='max price' onChange = {e=>setMaxPrice(parseInt(e.target.value)||0)}></input>
                </form>
                <button className={`tours__sort__btn`}
                 onClick={()=>filter()}>Filter</button>
               
                </div>
            </div>
        {tours.map(tour =>{
            return <TourCard key = {tour.id} tour = {tour}></TourCard>
        })}
           <Pages setPage={setPage} currentPage = {page} totalPages = {pages}></Pages>
     </div>
    )
})

export default Tours