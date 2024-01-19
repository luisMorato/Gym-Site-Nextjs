import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';

import FancyBtn from '../layout/FancyBtn';

import Styles from '@/app/styles/home/Index.module.css';

export default async function Index() {
    const session = await auth();

    return(
        <div id='index' className={Styles.index}>
            <div className={Styles.images}>
                <Image 
                src="/imgs/63af47665f53f9c69c56987a_dCCEwPaRXHbuh48_549x5D1rS24TOQvCL1pxGtkdD0w.png" 
                alt='boy training' 
                width={680} 
                height={700} 
                priority={true}/>
                
                <Image 
                className='' 
                src="/imgs/2stockedit.png" 
                alt='girl training' 
                width={500} 
                height={700} 
                priority={true}/>
            </div>
            <div className={Styles.index_txt}>
                <h3>Find Your Limits</h3>
                <h1>BUILD YOUR BODY</h1>
                <h2>Stay Healthy & Fit</h2>
                <br />
                <Link href={session?.user ? '/Classes' : '/Register'}>
                    <FancyBtn text={'Start Now'}/>
                </Link>
            </div>
        </div>
    )
}