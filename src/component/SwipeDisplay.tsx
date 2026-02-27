import React from 'react'
import { useCatContext } from '../hooks/useContext'
import SwipeCatImg from './SwipeCatImg';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Loading from './Loading';
import useWindowSize from '../hooks/useWindowSize';

function SwipeDisplay() {
    const catContext = useCatContext();
    const { width } = useWindowSize();

    return (
        <main className='swipeContainer'>
            <div className='likeTipContainer contextCenter'>
                {/* "dislike" are too long in a mobile screen in 450px change both to icons*/
                    width < 450 ? <AiOutlineLike className='icons' /> : <h2>Like</h2>
                }
                <FaLongArrowAltLeft className='icons leftArrow' />
            </div>
            {catContext.isLoading && <Loading />}
            {!catContext.isLoading && catContext.currentDisplayCat < catContext.nImgs && <SwipeCatImg />}
            <div className='dislikeTipContainer contextCenter'>
                {width < 450 ? <AiOutlineDislike className='icons' /> : <h2>Dislike</h2>}
                <FaLongArrowAltRight className='icons rightArrow' />
            </div>
        </main>
    )
}

export default SwipeDisplay