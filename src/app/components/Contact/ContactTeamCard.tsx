import Image from 'next/image';

import Styles from '@/app/styles/contact/ContactOurTeam.module.css';

type contactTeamProps = {
    imgSrc: string, 
    location: string, 
    name: string, 
    desc: string
};

export default function ContactTeamCard({ imgSrc, location, name, desc }: contactTeamProps) {
    return (
        <div className={Styles.team_card}>
            <div className='rounded-full h-[120px] w-[120px] overflow-hidden relative'>
                <Image src={imgSrc} alt={`${name}-photo`} fill={true} quality={100} sizes="120px"/>
            </div>
            <div className={Styles.team_card_desc}>
                <span>{location}</span>
                <h3>{name},</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}