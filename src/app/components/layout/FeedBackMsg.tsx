'use client'
import { msgProps } from '@/Types/route';

import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

import Styles from '@/app/styles/layout/FeedBackMsg.module.css';

export default function FeedBackMsg({ text, styleName }: msgProps){
    const dynamicStyles = Styles[styleName];

    return (
        <>
            <div className={`${Styles.msgContainer} ${dynamicStyles}`}>
                <p className={Styles.msg}>{styleName === 'ok' ? <FaCheckCircle/> : <FaExclamationTriangle />} {text}</p>
            </div>
        </>
    )
}
