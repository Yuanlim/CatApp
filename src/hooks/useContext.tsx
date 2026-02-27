import { useContext } from 'react'
import { CatContext } from '../context/CatContext';

export const useCatContext = () => {
    const dataContext = useContext(CatContext);
    if (!dataContext) {
        throw Error("Data context is undefined");
    }
    return dataContext;
};