import React from 'react'
import { useCatContext } from '../hooks/useContext';
import '../finished.css'

function FinishedDisplay() {
    const catContext = useCatContext();

    return (
        <main className='finishedContainer contextCenter'>
            <h2 className='likedHeader'>Cat image you liked:</h2>
            <div className='likedContainer'>
                {catContext.likedImg.map(imgIndex =>
                    <div className='likedCard'>
                        <img
                            src={catContext.listOfImg[imgIndex]}
                            alt={`cat img ${imgIndex}`}
                            key={imgIndex}
                            style={{ width: 300, height: 300 }}
                        />
                    </div>
                )}
            </div>
            <button type="button" onClick={catContext.resetAll} className="resetButton">Reset</button>
        </main>
    )
}

export default FinishedDisplay