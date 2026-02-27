import React from 'react'
import { PiCatDuotone } from 'react-icons/pi'
import useWindowSize from '../hooks/useWindowSize';

function Header() {
    const { width } = useWindowSize();

    return (
        <header className='contextCenter' style={{ flexDirection: "row", gap: "5px", padding: "10px 0" }}>
            <PiCatDuotone className='icons' />
            <h2>
                {width > 550 ?
                    "Paws & Preferences: Find Your Favourite Kitty" :
                    "Find Your Favourite Kitty"
                }
            </h2>
        </header>
    );
}

export default Header