import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

import Logo from "./Logo";

import Styles from '@/app/styles/layout/Footer.module.css';

export default function Footer() {
    return(
        <footer className={Styles.footer}>
            <div className={Styles.footer_container}>
                <div className="flex flex-col items-start justify-center">
                    <Logo text={'footer'}/>
                    <div className={Styles.socials}>
                        <h1>Socials:</h1>
                        <div className="text-white text-2xl flex gap-2">
                            <Link className='hover:-translate-y-2' href='https://www.facebook.com/luis.fernando.940/' target='_blank'>
                                <FaFacebook/>
                            </Link>
                            <Link className='hover:-translate-y-2' href='https://www.instagram.com/l0u1s_f3r/' target='_blank'>
                                <FaInstagram/>
                            </Link>
                            <Link className='hover:-translate-y-2' href='https://www.linkedin.com/in/luis-fernando-morato-da-conceição-985123223/' target='_blank'>
                                <FaLinkedin/>
                            </Link>
                            <Link className='hover:-translate-y-2' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley' target='_blank'>
                                <FaYoutube/>
                            </Link>
                            <Link className='hover:-translate-y-2' href='www.github.com' target='_blank'>
                                <FaGithub/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={Styles.working_hours}>
                    <h1>Working Hours</h1>
                    <ul>
                        <p>Monday - Friday:</p>
                        <li>6:00am - 23:00pm</li>
                        <p>Saturday:</p>
                        <li>8:00am - 17:00pm</li>
                        <p>Sunday:</p>
                        <li>8:00am - 14:00pm</li>
                    </ul>
                </div>
                <div className={Styles.contact_us}>
                    <h1>Contact Us</h1>
                    <ul>
                        <li><span>Address:</span> Brazil, Street Lorem ipsum, 170, dolor sit amet.</li>
                        <li><span>Email:</span> luisfernandomorato_170701@outlook.com</li>
                        <li><span>Tel:</span> (15) 9 98181-8866</li>
                    </ul>
                </div>
            </div>
            <div className={Styles.powered_by}>
                <p>© Powered by <strong>Luis Fernando</strong> | 2023</p>
            </div>
        </footer>
    )
}