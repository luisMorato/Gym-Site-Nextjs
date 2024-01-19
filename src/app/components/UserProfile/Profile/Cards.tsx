'use client';
import Link from "next/link";
import { FaArrowRight, FaDumbbell, FaCcMastercard} from 'react-icons/fa6';

import { UserPlan } from "@/Types/route";

import Styles from '@/app/styles/UserProfile/Profile/Profile.module.css';

const Cards = ({ searchUserPlan }: { searchUserPlan: UserPlan }) => {
    const date = new Date(Date.now());

    const newDate = new Date();
    newDate.setMonth(date.getMonth() + 1);
    const formatedDate = `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()}`.replace(/\b\d\b/g, '0$&');

    const checkMonth = (month: number) => {
        switch(month){
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
        }
    }

    return (
        <div className={Styles.cards}>
            <section>
                <div>
                    <h2 className="flex items-center gap-2"><FaDumbbell className="text-2xl"/>Gym Plan</h2>
                    <br />
                    <p>
                        Your Plan Status is:
                        <span className={searchUserPlan ? Styles.roundGreen : Styles.roundRed}></span> 
                        <>{searchUserPlan ? <b>active</b> : <b>not Active</b>}</>
                    </p>
                    <Link href='/checkMyPlan' className="flex items-center gap-4">Check My Plan <FaArrowRight /></Link>
                </div>
            </section>
            <section>
                <div>
                    <h2>Next Payment</h2>
                    <br />
                    <div className={Styles.paymentData}>
                        <div>
                            <FaCcMastercard className="text-3xl"/>
                        </div>
                        <div>
                            <h3><b>{checkMonth(newDate.getMonth())} Payment</b></h3>
                            <p><b>$ {searchUserPlan ? (searchUserPlan?.price)?.toFixed(2).replace(".", ",") : (0).toFixed(2).replace(".", ",")}</b></p>
                            <p>Due date: <span>{searchUserPlan ? formatedDate : <>YYYY/MM/DD</>}</span></p>
                        </div>
                    </div>
                    <Link href='/checkMyPayments' className="flex items-center gap-4">Check My Payments <FaArrowRight /></Link>
                </div>
            </section>
            <section>
                <div>
                    <h2>Class Book</h2>
                    <br />
                    <p>Select the class on the Unit more close and on the better hour to you.</p>
                    <Link href='/Classes' className="flex items-center gap-4">Reserve a Class <FaArrowRight /></Link>
                </div>
            </section>
        </div>
    )
}

export default Cards;