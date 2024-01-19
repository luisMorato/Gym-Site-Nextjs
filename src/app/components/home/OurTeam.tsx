'use client';
import data from '@/../public/data/Data.json';
const { coaches } = data;

import CoachCard from "./CoachCard";

import Styles from '@/app/styles/home/OurTeam.module.css';

export default function OurTeam() {
    return(
        <div className={Styles.our_team}>
            <h2>Our Team of Coaches</h2>
            <p>Expert team of coaches helps you succeed in any goal, motivation provided!</p>
            <div className={Styles.coaches}>
                {coaches.map((coach) => (
                    <CoachCard key={coach.name} coach={coach} />
                ))}
            </div>
        </div>
    )
}