import React from 'react'
import { useCatContext } from '../hooks/useContext';
import SwipeDisplay from './SwipeDisplay';
import FinishedDisplay from './FinishedDisplay';
import '../introduction.css'
import Introduction from './Introduction';

export function Main() {
    const catContext = useCatContext();

    return (
        catContext.currentDisplayCat < catContext.nImgs ? catContext.isStarted ? <SwipeDisplay /> : <Introduction /> : <FinishedDisplay />
    )
}
