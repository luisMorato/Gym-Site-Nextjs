'use client';
import Image from "next/image";
import Link from "next/link";

import Styles from '@/app/styles/UserProfile/Profile/Profile.module.css';

const KnowMore = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold ml-8">Know More</h2>
            <div className={Styles.KnowMore}>
                <div className={Styles.app}>
                    <div className={Styles.image}>
                        <Image src='/imgs/4412951.jpg' alt="Gym App" fill={true} sizes="250px"></Image>
                    </div>
                    <h3>Track your training via 3CC App</h3>
                    <p>In the app you can access the training list and view all the exercises.</p>
                    <Link href='/ourApp'><button>Get to Know</button></Link>
                </div>
                <div className={Styles.betterResults}>
                        <div className={Styles.image}>
                            <Image src='/imgs/20944751.jpg' alt="Better Training" fill={true} quality={100} sizes="250px"></Image>
                        </div>
                        <h3>Supercharge your training</h3>
                        <p>Discover our products and services and enhance your results and have even more motivation in your training.</p>
                        <Link href='/ourProducts'><button>Know More</button></Link>
                </div>
                <div className={Styles.coaching}>
                    <div className={Styles.image}>
                        <Image src='/imgs/personal_trainer_and_woman_exercising_in_gym.jpg' alt="Coaching" fill={true} quality={100} sizes="250px"></Image>
                    </div>
                    <h3>3CC Coach</h3>
                    <p>Your online fitness consultant that will transform your body and your health!</p>
                    <Link href='/gymCoaching'><button>Know More</button></Link>
                </div>
            </div>
        </div>
    )
}

export default KnowMore;