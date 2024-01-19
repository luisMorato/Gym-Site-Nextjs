import Link from 'next/link';

import Styles from '@/app/styles/home/OferedClasses.module.css';

type classProps = {
    id: number,
    type: string, 
    src: string, 
    schedule: string
};

export default function Class({ id, type, src, schedule }: classProps) {
    const backgroundImg = {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '200px'
    };
    
    return(
        <Link href={`/Classes/${id}`} style={backgroundImg} className={Styles.class}>
            <div>
                <h3>{type}</h3>
                <p>{schedule}</p>
            </div>
        </Link>
    )
}