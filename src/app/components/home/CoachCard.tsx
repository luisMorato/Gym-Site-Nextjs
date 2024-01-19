import Image from "next/image";

import Styles from '@/app/styles/home/CoachCard.module.css';

import { coachProps } from '@/Types/route';

export default function CoachCard({ coach }: coachProps) {
    return(
        <div key={coach.name} className={Styles.coach_card}>
            <Image src={coach.imgSrc} alt={coach.name} width={200} height={500} ></Image>
            <h3>{coach.name}</h3>
            <p>{coach.profession}</p>
        </div>
    )
}