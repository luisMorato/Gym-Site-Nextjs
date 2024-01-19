import Link from "next/link";
import { FaUserAlt } from 'react-icons/fa';

import Logo from "./Logo";
import Navbar from "./Navbar";

import Styles from '@/app/styles/layout/Header.module.css';
import { auth } from "@/auth";

export default async function Header() {
    const session = await auth();

    return (
        <header className={Styles.header}>
            <Link href='/'>
                <Logo text={'header'} />
            </Link>
            <Navbar />
            <div className="flex flex-row gap-4">
                <Link href='/Login'>
                    <button type="button" className={Styles.login_btn}><FaUserAlt /></button>
                </Link>
                <Link href={session?.user ? '/Classes' :'/Register'}>
                    <button type="button" className={Styles.join_class_btn}>Join Classes Now</button>
                </Link>
            </div>
        </header>
    )
}