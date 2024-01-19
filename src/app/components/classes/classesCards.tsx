import Link from 'next/link';

import FancyBtn from "../layout/FancyBtn";

import Styles from '@/app/styles/classes/Classes.module.css';

type props = {
    id: number,
    type: string, 
    src: string, 
    schedule: string
};

export default function ClassesCards({ id, type, src, schedule }: props) {
    const backgroundImg = {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '350px',
    };
    
    return(
        <div style={backgroundImg} className={Styles.classes_card}>
            <div>
                <h1>{type}</h1>
                <p>{schedule}</p>
            </div>
            <Link href={`/Classes/${id}`}>
                <FancyBtn text="Join Now"/>
            </Link>
        </div>
)
}