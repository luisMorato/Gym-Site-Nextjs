'use client';
import Card from './Card';

import Styles from '@/app/styles/home/IndexCards.module.css';

import { cardInfoProps } from '@/Types/route';

export default function IndexCards() {
    const cardInfos: cardInfoProps[] = [
        {
            id: 1,
            name: 'Workout',
            description: 'Our team are ready to help you set up your workout, either in bodybuilding, power lifiting, or just get in shape.'
        },
        {
            id: 2,
            name: 'Nutrition',
            description: 'Our team are ready to help you set up your workout, either in bodybuilding, power lifiting, or just get in shape.'
        },
        {
            id: 3,
            name: 'Real Progress',
            description: 'Our team of professionals and specialists are prepared to create a personal plan to help you  you achieve your dream body.',
        }
    ];

    return(
        <div className={Styles.indexCards}>
            <div className={Styles.cardAlign}>
                {cardInfos.map((cardInfo:cardInfoProps) => (
                    <Card key={cardInfo.id} cardInfo={cardInfo}/>
                ))}
            </div>
        </div>
    )
}