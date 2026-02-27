import React from 'react'
import { useCatContext } from '../hooks/useContext';
import '../swipeDisplay.css'


function SwipeCatImg() {
    const catContext = useCatContext();

    return (
        <div className='contextCenter'>
            <img
                key={catContext.currentDisplayCat}
                src={catContext.listOfImg[catContext.currentDisplayCat]} alt="cat img"
                className='catImg'
                // when swipe user cant accidentally select img or count it as scrolling
                style={{ ...catContext.imgCurrentStyle, userSelect: "none", touchAction: "none" }}
                // dragging usage to prevent re-renders
                ref={catContext.imgRef}
                // prevent ghost img when drag
                draggable={false}
                onDragStart={e => e.preventDefault()}
                // events
                onPointerDown={e => catContext.grabbingImgHandler(e)}
                onPointerMove={e => catContext.movingHandler(e)}
                onPointerUp={e => catContext.finishDraggingHandler(e)}
                onPointerEnter={e => catContext.enterHandler(e)}
                onPointerLeave={e => catContext.leaveHandler(e)}
            />
        </div>
    )
}

export default SwipeCatImg