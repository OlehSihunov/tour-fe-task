import React, { useEffect, useState } from 'react'
import './pages.scss'

interface IPagesProps{
    totalPages: number,
    currentPage:number,
    setPage: (page:number)=>void
}

const Pages = ({totalPages,currentPage,setPage}:IPagesProps) => {
    
    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit,setMinPageNumberLimit]  = useState(1)

    function generatePagination() {
        const links = []
        if(totalPages>maxPageNumberLimit)
        for(let i = minPageNumberLimit; i <=maxPageNumberLimit;i++){
                links.push(i)
        }
        else{
            for(let i = 0; i <totalPages;i++){
                links.push(i)
        } 
        }
        console.log(links)
        return links
    }
    useEffect(()=>{

        if(currentPage===0){
            setMaxPageNumberLimit(4)
            setMinPageNumberLimit(0)
        }
    },[currentPage])
    const handleNext = () => {
        if(currentPage+1>maxPageNumberLimit) {
         if(maxPageNumberLimit+pageNumberLimit<= totalPages) {
            setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
         }
         else{
            setMaxPageNumberLimit(totalPages)
            setMinPageNumberLimit(totalPages-pageNumberLimit)
         }
        }
        setPage(currentPage+1)
    }
    const handlePrev = () => {
        if(currentPage-1<minPageNumberLimit&&currentPage!=0) {
          if(minPageNumberLimit-pageNumberLimit>=0) {
            setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit)
          }
          else {
            setMaxPageNumberLimit(0+pageNumberLimit)
            setMinPageNumberLimit(0)
          }
          
        }
        setPage(currentPage-1)
    }
    return(
        <div className = "pages">
              {currentPage!==0?
              <span onClick={()=>handlePrev()}  className ="pages-item">Prev</span>
              :
              null}
              {minPageNumberLimit>1?
              <span onClick={()=>handlePrev()}  className ="pages-item">...</span>
              :
              null}
              {generatePagination().map(el => {
                 return <span onClick={()=>setPage(el)} className ={el===currentPage?"pages-item__active pages-item": "pages-item"}>{el+1}</span>
              })}
                {totalPages>maxPageNumberLimit?
                <span onClick={()=>handleNext()}  className ="pages-item">...</span>
                :
                null}  
               {currentPage+1!==totalPages?
                <span onClick={()=>handleNext()} className ="pages-item">Next</span>
                :
                null}  
        </div>
    )
}

export default Pages;