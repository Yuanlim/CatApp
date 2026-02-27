import React, { useState } from 'react'
import { useCatContext } from '../hooks/useContext'
import '../introduction.css'
import cat from '../img/cat.png'

const Introduction = () => {
    const catContext = useCatContext();
    const [userTyped, setUserTyped] = useState<number>(1)

    return (
        <main className='introductionContainer'>
            <div className='catWavingIconContainer'>
                <img src={cat} alt="cat waving" className='catWavingIcon' />
            </div>

            <div>
                <h2 className='headerText'>Introduction:</h2>
                <p className='bodyText'>This is an app where we will fetch image from Cataas and let you decide which one you like. By swiping left or right.</p>
            </div>

            <div>
                <h2 className='headerText'>Feature</h2>
                <ul className='bodyText'>
                    <li>Input your own amount of cat image per round.</li>
                    <li>Each cat is uniquely different.</li>
                    <li>Swipe gives you animations that follows your pointer or touch.</li>
                    <li>Reset option after ended.</li>
                </ul>
            </div>

            <div>
                <label className='bodyText'>Amount of cat (min 1, max 20): </label>
                <input
                    type="number"
                    name="amount"
                    className="bodyText"
                    id="catAmount"
                    min={1}
                    max={20}
                    style={{ borderBottom: "2px solid lightblue" }}
                    onChange={e => {
                        const val = Math.floor(Number(e.target.value));
                        if (val > 20)
                            setUserTyped(20)
                        if (val < 1)
                            setUserTyped(1)
                        setUserTyped(val)
                    }}
                />
                <button
                    type="button"
                    onClick={() => {
                        catContext.setNImgs(userTyped);
                        catContext.setIsStarted(true);
                    }}
                    className='bodyText startButton'
                >Start</button>
            </div>
        </main>
    )
}

export default Introduction