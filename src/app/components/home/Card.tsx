'use client';

import Styles from '@/app/styles/home/IndexCards.module.css';

type props = {
    cardInfo: {
        name: string,
        description: string
    }
};

export default function Card({ cardInfo }:  props ) { 
    return(
        <div className={Styles.card}>
            <h2>{cardInfo.name}</h2>
            <p>{cardInfo.description}</p>
        </div>
   ) 
}