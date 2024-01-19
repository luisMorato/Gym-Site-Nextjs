'use client';
import data from '@/../public/data/Data.json';
const { classes } = data;

import { classesInfoProps } from '@/Types/route';

import Class from './Class';

import Styles from '@/app/styles/home/OferedClasses.module.css';

export default function OferedClasses() {
    const classesInfoIndexes = [4, 3, 5, 7, 1, 2];

    const classesInfo:classesInfoProps = classes.filter((item) => classesInfoIndexes.includes(item.id));
    classesInfo.sort((a, b) => classesInfoIndexes.indexOf(a.id) - classesInfoIndexes.indexOf(b.id));

    return(
        <div className={Styles.ofered_classes}>
            <h2>Take a look at some of our offered classes</h2>
            <br />
            <div className={Styles.classes}>
                {classesInfo.map((classInfo) => (
                    <Class key={classInfo.id} id={classInfo.id} src={classInfo.src} type={classInfo.type} schedule={classInfo.schedule} />
                ))}
            </div>
        </div>
    )
}