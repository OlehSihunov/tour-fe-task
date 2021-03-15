import React, { useEffect } from 'react'
import App from '../../App'
import rootStore from '../../stores/rootStore'

const Wrapper = () => {
    const {getTours} = rootStore.toursStore
    useEffect(()=>{
      getTours()
    })
    return (
       <App/>
    )
}

export default  Wrapper