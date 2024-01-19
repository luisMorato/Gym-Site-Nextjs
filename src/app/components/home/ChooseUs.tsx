import Link from 'next/link';
import FancyBtn from '../layout/FancyBtn';

import Styles from '@/app/styles/home/ChooseUs.module.css';

export default function ChooseUs() {
    return(
        <div className={Styles.choose_us}>
            <div className={Styles.image}></div>
            <div className={Styles.explanation}>
                <h2>Why choose us ?</h2>
                <br />
                <p>Our gym is the ideal choice for achieving your fitness and wellness goals. With a team of qualified professionals, we offer a variety of modalities for all levels. Our motivating environment and state-of-the-art equipment guarantee the best experience. Come join our community passionate about health and fitness! Join us today and embark on a transformative journey to a healthier lifestyle.</p>
                <br />
                <Link href='#priceplans'>
                    <FancyBtn text={'Our Plans'} />
                </Link>
            </div>
        </div>
    )
}