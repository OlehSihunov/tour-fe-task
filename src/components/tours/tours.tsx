import { observer } from 'mobx-react'
import React from 'react'
import rootStore from '../../stores/rootStore'
const Tours = observer(() => {
    const {tours} = rootStore.toursStore
    return (
        <div className='tours'>
            <h1>Tours</h1>
            {tours.slice().map(el =>{
                return <div key = {el.id} className= 'tour'>{el.description}</div>
            })}
        </div>
    )
})

export default Tours