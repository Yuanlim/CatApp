// import { useEffect, useRef, useState, PointerEvent } from "react";
// import useWindowSize from "./useWindowSize"
// import { CatHookReType } from "../types/hookType";


// function useCatHook(): CatHookReType {
//     const { width, height } = useWindowSize();
//     const [imgCurrentStyle, setImgCurrentStyle] = useState<React.CSSProperties>(); // noting img styles
//     const imgRef = useRef<HTMLImageElement | null>(null); // handle dragging animations (too rapid)
//     const [fetchError, setFetchError] = useState<string>("");
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [listOfImg, setListOfImg] = useState<string[]>([]);
//     const [nImgs, setNImgs] = useState<number>(20);
//     const isInitializingRef = useRef<boolean>(false);
//     const [currentDisplayCat, setCurrentDisplayCat] = useState<number>(0); // display cat imgs by indexing
//     const [likedImg, setLikedImg] = useState<number[]>([]);
//     const [dislikedImg, setDislikedImg] = useState<number[]>([]);
//     const seenUrlRef = useRef<Set<string>>(new Set()); // unique set of url
//     const startPos = useRef<number[]>([0, 0]); // x, y
//     const offset = useRef<number[]>([0, 0]); // x, y
//     const decidedCondition: number = 50;
//     const forceDragRange: number = 70;


//     // trigger img resize, when window resized
//     useEffect(() => {
//         if (width > height) {
//             // use height to resize image to avoid out of boundaries
//             setImgCurrentStyle(prevStyle => {
//                 return { ...prevStyle, width: "auto", height: "clamp(100px, 50vh, 600px)" }
//             })
//             return;
//         }

//         setImgCurrentStyle(prevStyle => {
//             return { ...prevStyle, width: "clamp(100px, 50vw, 300px)", height: "auto" }
//         })

//         return () => { console.log("Cleaning up fetch effect") }

//     }, [width, height])


//     // trigger initialize
//     useEffect(() => {
//         if (listOfImg.length >= nImgs) return; // earlier return when satisfy amount of img
//         if (isInitializingRef.current) return; // earlier return when 1 loop is running

//         const initializeImg = async () => {
//             isInitializingRef.current = true; // I am initializing it rn
//             setIsLoading(true); // tell react time to rerender is loading text

//             // when deletion trigger useEffect to fill out the rest
//             for (let index = listOfImg.length; index < nImgs; index++) {
//                 const img = await fetchImage();
//                 if (img)
//                     setListOfImg(prevImg => [...prevImg, img]);
//                 else
//                     index--;
//             }

//             isInitializingRef.current = false; // I am finishing initializing it rn
//             setIsLoading(false); // tell react time to stop showing is loading text
//         }

//         initializeImg();

//         return () => { console.log("Cleaning up fetch effect") }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [listOfImg.length])


//     // fetching one cat image
//     const fetchImage = async (): Promise<string | undefined> => {
//         try {
//             const randWidth = Math.random() * 500;

//             const resp = await fetch(`https://cataas.com/cat?json=true,width=${randWidth}`);

//             if (!resp.ok) {
//                 setFetchError(`Something when wrong..., error with status code: ${resp.status}`);
//                 return;
//             }

//             const jsonBody = await resp.json();
//             const imgUrl: string = jsonBody['url'];

//             // const imgUrl: string = "https://cataas.com/cat";
//             if (seenUrlRef.current.has(imgUrl)) // seen before
//                 return;

//             // add seen and return new preloaded img
//             seenUrlRef.current.add(imgUrl);

//             return imgUrl

//         } catch (error) {
//             if (error instanceof Error)
//                 setFetchError(`Something when wrong..., error message: ${error.message}`)
//             else
//                 setFetchError("Unexpected error")
//         }
//     }

//     const grabbingImgHandler = (e: PointerEvent<HTMLDivElement>) => {
//         // when grab return to 0 skew
//         setImgCurrentStyle(prevStyle => {
//             return { ...prevStyle, transform: "scale(1) skewX(0deg)", transition: "transform 0.5s ease" }
//         });

//         // note start x y pos
//         startPos.current = [e.clientX, e.clientY];

//         // keep receiving event during drag
//         e.currentTarget.setPointerCapture(e.pointerId);

//     }

//     // when move follow pointer direction
//     const movingHandler = (e: PointerEvent<HTMLDivElement>) => {
//         if (e.buttons !== 1)
//             return;

//         // transform x, y by "number" calc, stops when over specific values
//         offset.current[0] = clamp(e.clientX - startPos.current[0], forceDragRange, -forceDragRange);
//         offset.current[1] = clamp(e.clientY - startPos.current[1], forceDragRange, -forceDragRange);

//         if (imgRef.current) {
//             imgRef.current.style.transform = `translate(${offset.current[0]}px, ${offset.current[1]}px)`
//         }
//     }

//     // finish dragging the img
//     const finishDraggingHandler = async (e: PointerEvent<HTMLDivElement>) => {
//         if (!imgRef.current) return;
//         console.log("Enter");
//         // stop receiving event actions
//         e.currentTarget.releasePointerCapture(e.pointerId);

//         // determine user actions: right | left | indecisive
//         // only care x

//         // 4 frames portions transform
//         // const frameY = offset.current[1] / 4; // slowly translate to 0
//         let frameX = ((width / 2) - 30 - Math.abs(offset.current[0])) / 4; // excluding margin
//         let animation: Animation | null = null;

//         if (offset.current[0] >= decidedCondition) { // right
//             setLikedImg(prevLiked => [...prevLiked, currentDisplayCat])
//             animation = imgRef.current.animate(
//                 [
//                     { transform: `translate(${offset.current[0]}px, ${offset.current[1]}px) scale(1)` },
//                     {
//                         transform: `
//                             translate(${offset.current[0] + frameX}px, ${offset.current[1]}px)
//                             scale(0.75)
//                         `
//                     },
//                     {
//                         transform: `
//                             translate(${offset.current[0] + frameX * 2}px, ${offset.current[1]}px)
//                             scale(0.5)
//                         `
//                     },
//                     {
//                         transform: `
//                             translate(${offset.current[0] + frameX * 3}px, ${offset.current[1]}px)
//                             scale(0.25)
//                         `
//                     },
//                     {
//                         transform: `
//                             translate(${offset.current[0] + frameX * 4}px, ${offset.current[1]}px)
//                             scale(0)
//                         `
//                     }
//                 ],
//                 { duration: 1000, easing: "linear", fill: "forwards" }
//             );
//         } else if (offset.current[0] <= -decidedCondition) { // left
//             setDislikedImg(prevDisliked => [...prevDisliked, currentDisplayCat])
//             animation = imgRef.current.animate(
//                 [
//                     { transform: `translate(${offset.current[0]}px, ${offset.current[1]}px) scale(1)` },
//                     {
//                         transform: `
//                             translate(${offset.current[0] - frameX}px, ${offset.current[1]}px)
//                             scale(0.75)
//                         `
//                     },
//                     {
//                         transform: `
//                             translate(${offset.current[0] - frameX * 2}px, ${offset.current[1]}px)
//                             scale(0.5)
//                         `
//                     },
//                     {
//                         transform: `
//                             translate(${offset.current[0] - frameX * 3}px, ${offset.current[1]}px)
//                             scale(0.25)
//                         `
//                     },
//                     {
//                         transform: `
//                             translate(${offset.current[0] - frameX * 4}px, ${offset.current[1]}px)
//                             scale(0)
//                         `
//                     }
//                 ],
//                 { duration: 1000, easing: "linear", fill: "forwards" }
//             );
//         } else {
//             console.log("indecisive");
//             return;
//         }

//         // waiting for animation to finish
//         await animation.finished;

//         animation.cancel();

//         imgRef.current.style.transform = "translate(0px, 0px) scale(0)";
//         // get next cat
//         setCurrentDisplayCat(prevIndex => prevIndex + 1)
//     }


//     // enter == hover => skew, but not click
//     const enterHandler = (e: PointerEvent<HTMLDivElement>) => {
//         if (e.buttons !== 0)
//             return;

//         setImgCurrentStyle(prevStyle => {
//             return { ...prevStyle, transform: "scale(1.1) skewX(2deg)", transition: "transform 0.5s ease" }
//         })
//     }

//     // leave no skew
//     const leaveHandler = (e: PointerEvent<HTMLDivElement>) => {
//         if (e.buttons !== 0)
//             return;

//         setImgCurrentStyle(prevStyle => {
//             return { ...prevStyle, transform: "scale(1) skewX(0deg)", transition: "transform 0.5s ease" }
//         })
//     }

//     // reuseable clamp function (if necessary validate maximum is lower than minimum)
//     const clamp = (value: number, maximumVal: number, minimumVal: number) => Math.max(Math.min(value, maximumVal), minimumVal);

//     return {
//         imgCurrentStyle,
//         imgRef,
//         grabbingImgHandler,
//         movingHandler,
//         finishDraggingHandler,
//         enterHandler,
//         leaveHandler,
//         fetchError,
//         isLoading,
//         setNImgs,
//         listOfImg,
//         nImgs,
//         fetchImage,
//         currentDisplayCat,
//         likedImg,
//         dislikedImg
//     }
// }

// export default useCatHook;

import React from 'react'

type Props = {}

const useCatHook = (props: Props) => {
    return (
        <div>useCatHook</div>
    )
}

export default useCatHook