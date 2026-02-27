import { CSSProperties, PointerEvent, Dispatch, SetStateAction, RefObject } from "react";

export type CatContextType = {
    width: number;
    height: number;
    imgCurrentStyle: CSSProperties | undefined;
    imgRef: RefObject<HTMLImageElement | null>;
    grabbingImgHandler: (e: PointerEvent<HTMLDivElement>) => void;
    movingHandler: (e: PointerEvent<HTMLDivElement>) => void;
    finishDraggingHandler: (e: PointerEvent<HTMLDivElement>) => void;
    enterHandler: (e: PointerEvent<HTMLDivElement>) => void;
    leaveHandler: (e: PointerEvent<HTMLDivElement>) => void;
    fetchError: string;
    isLoading: boolean;
    setNImgs: Dispatch<SetStateAction<number>>;
    listOfImg: string[];
    nImgs: number;
    fetchImage: () => Promise<string | undefined>;
    currentDisplayCat: number;
    likedImg: number[];
    dislikedImg: number[];
    resetAll: () => void;
    isStarted: boolean;
    setIsStarted: Dispatch<SetStateAction<boolean>>;
};

// excluding out some unused attributes
// export type SwipeCardPropsType = Omit<CatConType, "isLoading" | "setNImgs" | "fetchError">;

// export type LoadingType = {listOfImg: string[], nImgs: number};
