import React, {useState} from 'react'
import { observer } from 'mobx-react'
import rootStore from '../../stores/rootStore'
import TourCard from './tourCard/tourCard'
import './tours.scss'
import ITour from '../../interfaces/ITour'

const Tours = observer(() => {
    const {tours} = rootStore.toursStore
    const [page,setPage] = useState(1)
    const [size] = useState(6)
    const [sort,setFilter] = useState('ASC')
    const [maxPrice,setMaxPrice] =useState(9999)
    const [minPrice,setMinPrice] = useState (0)
    let awailableTours :number =tours.length ;
    function generatePagination() {
      
        const numberOfPages = awailableTours/size
        const links = []
        for(let i = 1; i <=numberOfPages;i++){
            links.push(i)
        }
        return links
    }
    function getPage(page :number,size :number,sort: string, minPrice :number, maxPrice :number) {
        const pageTours = tours.slice();
        if(sort === 'ASC')
          pageTours.sort((a:ITour,b:ITour) => parseInt(a.price)-parseInt(b.price) )
        else 
          pageTours.sort((a:ITour,b:ITour) => parseInt(b.price)-parseInt(a.price) )
        let result = pageTours.filter((tour:ITour) => parseInt(tour.price)>minPrice&&parseInt(tour.price)<maxPrice);
        awailableTours = result.length;
        return result.filter((el :ITour,index: number) =>index>=(page-1)*size && index<page*size)
      }
    return (
        <div className='tours'>
            <h1>Tours</h1>  
            <div className ='sort'>
                <select onChange ={(e)=>setFilter(e.target.value)}>
                    <option value ='ASC' >ASC</option>
                    <option value = 'DESC'>DESC</option>
                </select>
                <form>
                    <label>Min price</label>
                    <input value = {minPrice} onChange = {e=>setMinPrice(parseInt(e.target.value)||0)}></input>
                    <label>Max price</label>
                    <input value = {maxPrice} onChange = {e=>setMaxPrice(parseInt(e.target.value)||0)}></input>
                </form>
            </div>
        {getPage(page,size,sort,minPrice,maxPrice).map(tour =>{
            return <TourCard key = {tour.id} tour = {tour}></TourCard>
        })}
        <p>{generatePagination().map(el => {
            return <span key = {el} className = {`tours__page-number ${el===page?'tours__page-number_active' : ''}`} onClick = {()=>setPage(el)}>{el}</span>
        })}</p>
     </div>
    )
})

export default Tours