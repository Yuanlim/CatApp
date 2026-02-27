import React from 'react'
import searchCat from '../img/searchCat.png'
import { useCatContext } from '../hooks/useContext'
import '../loading.css'


function Loading() {
    const catContext = useCatContext();

    return (
        <div className='contextCenter' style={{ flexDirection: 'column', gap: "30px" }}>
            <div style={{ display: "flex" }}>
                <img src={searchCat} alt="Searching cat icon" className='searchCatImg' />
                <p className='elms-sans-loading contextCenter'>Is Loading...</p>
            </div>
            <h3><span style={{ color: "red" }}>
                {catContext.listOfImg.length}</span> out of {catContext.nImgs} loaded
            </h3>
        </div>
    )
}

export default Loading