'use client';
import Link from "next/link";
import { useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa';
import { BiX } from 'react-icons/bi';

import Styles from '@/app/styles/layout/Navbar.module.css';

export default function Navbar() {
    const smoothScrollTo = (id:string) => {
        document.querySelector(id)?.scrollIntoView({
            block: 'center',
            behavior:"smooth"
        })
    }

    const [itsShown, setItsShow] = useState(false)

    const showMobileMenu = () => {
        setItsShow(!itsShown)
    }
    
    return (
        <div>
            <button 
                onClick = {showMobileMenu}><FaAlignJustify className={`text-2xl mt-1 + ${Styles.OpenMobileMenuBtn}`}/>
            </button>
            <nav className={`${Styles.navbar} ${itsShown ? Styles.showSideMenu : Styles.hideSideMenu}`}>
                <ul>
                    <div className={Styles.CloseMobileMenu}>
                        <h2>Menu</h2>
                        <button onClick = {showMobileMenu}><BiX className={` text-white + ${Styles.CloseMobileMenuBtn}`}/></button>
                    </div>
                    <Link href="/">
                        <li>Home</li>
                    </Link>
                    <Link href="/About">
                        <li>About</li>
                    </Link>
                    <Link href="/Gallery">
                        <li>Gallery</li>
                    </Link>
                    <Link href="/Schedule">
                        <li>Schedule</li>
                    </Link>
                    <Link href="/" onClick={() => smoothScrollTo('#priceplans')}>
                        <li>Pricing</li>
                    </Link>
                    <Link href="/Classes">
                        <li>Classes</li>
                    </Link>
                    <Link href="/Contact">
                        <li>Contact</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}