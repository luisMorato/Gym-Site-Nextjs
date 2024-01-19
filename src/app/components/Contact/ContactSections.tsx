import Link  from 'next/link';

import { FaArrowRight, FaRegCommentDots, FaRegEnvelope, FaHeadset } from 'react-icons/fa';

import Styles from '@/app/styles/contact/ContactSections.module.css';

export default function ContactSections() {
    return(
        <div className={Styles.contact_section}>
            <section className=''>
                <FaRegCommentDots className='text-black text-3xl' />
                <h2>Chat Support</h2>
                <p>Lorem ipsum dolor sit amet Nobis, nemo at!</p>
                <Link href='' className='flex items-center gap-1'>Chat Now <FaArrowRight className='text-red-600'/></Link>
            </section>
            <section className=''>
                <FaRegEnvelope className='text-black text-3xl' />
                <h2>Email Support</h2>
                <p>Lorem ipsum dolor sit amet Nobis, nemo at!</p>
                <Link href='' className='flex items-center gap-1'>Send Email <FaArrowRight className='text-red-600'/></Link>
            </section>
            <section className=''>
                <FaHeadset className='text-black text-3xl' />
                <h2>Help Center</h2>
                <p>Lorem ipsum dolor sit amet Nobis, nemo at!</p>
                <Link href='' className='flex items-center gap-1'>Visit Help Center <FaArrowRight className='text-red-600'/></Link>
            </section>
        </div>
    )
}