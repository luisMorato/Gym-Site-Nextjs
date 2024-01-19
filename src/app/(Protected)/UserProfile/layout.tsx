'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { FaUser, FaGear, FaClipboardCheck } from 'react-icons/fa6';
import { useEffect, useState } from "react";
import { FaChevronLeft , FaChevronRight } from "react-icons/fa";

import Styles from '@/app/styles/UserProfile/UserProfileLayout.module.css';


const ProfileSideMenu = ({ children }: { children: React.ReactNode }) => {
    const [clicked, setClicked] = useState<string>('');
    const [isOpen, setIsopen] = useState<boolean>(true);

    const pathName = usePathname();

    useEffect(() => {
        const checkClicked = () => {
            if(pathName.split('/')[2] === 'Profile'){
                setClicked('profile');
            }else if(pathName.split('/')[2] === 'UserRegisteredClasses'){
                setClicked('myClasses');
            }else if(pathName.split('/')[2] === 'ProfileSettings'){
                setClicked('settings');
            }
        }

        checkClicked();
    }, [pathName]);

    return (
        <div className={Styles.profileContainer}>
            <div className={Styles.profileContent}>
                <nav
                className={isOpen ? `${Styles.sideMenu} ${Styles.open}` : `${Styles.sideMenu} ${Styles.close}`}>
                    <button
                        className="absolute -right-[12px] z-[2] bg-black rounded-full p-[2px]"
                        onClick={() => setIsopen(!isOpen)}
                        >{isOpen ? <FaChevronLeft className="mr-[2px] text-xl text-white z-[3]"/> : <FaChevronRight className="ml-[2px] text-xl text-white z-[3]"/>}
                    </button>
                    <ul>
                        <Link onClick={() => setClicked('profile')} href="/UserProfile/Profile">
                            <div id="profile" className={clicked === 'profile' ? `flex items-center mb-3 gap-2 ${Styles.clicked}` : "flex items-center mb-3 gap-2"}>
                                <span className={Styles.icon}>
                                    <FaUser/>
                                </span>
                                <li>
                                    Profile
                                </li>
                            </div>
                        </Link>
                        <Link onClick={() => setClicked('myClasses')} href="/UserProfile/UserRegisteredClasses">
                            <div id="myClasses"  className={clicked === 'myClasses' ? `flex items-center mb-3 gap-2 ${Styles.clicked}` : "flex items-center mb-3 gap-2"}>
                                <span className={Styles.icon}>
                                    <FaClipboardCheck className="bg-transparent"/>
                                </span>
                                <li>
                                    My Classes
                                </li>
                            </div>
                        </Link>
                        <Link onClick={() => setClicked('settings')} href="/UserProfile/ProfileSettings">
                            <div id="settings" className={clicked === 'settings' ? `flex items-center mb-3 gap-2 ${Styles.clicked}` : "flex items-center mb-3 gap-2"}>
                                <span className={Styles.icon}>
                                    <FaGear className="bg-transparent"/>
                                </span>
                                <li>
                                    Settings
                                </li>
                            </div>
                        </Link>
                    </ul>
                </nav>
                <>
                    {children}
                </>
            </div>
        </div>
    )
}

export default ProfileSideMenu