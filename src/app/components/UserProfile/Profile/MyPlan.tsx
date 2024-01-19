'use client';
import Image from "next/image";
import Link from "next/link";

import { UserPlan } from "@/Types/route";

import Styles from '@/app/styles/UserProfile/Profile/Profile.module.css';

const MyPlan = ({ searchUserPlan }: { searchUserPlan: UserPlan }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold ml-8">My Plan</h2>
            <div className={Styles.myPlanContent}>
                {searchUserPlan ? 
                    <div className={Styles.plan}>
                        <h1>{searchUserPlan.level}</h1>
                        <div className='mb-7 mt-2'>
                            <span>$ </span><h2>{(searchUserPlan.price)?.toFixed(2).replace(".",",")}</h2><span> /MONTHLY</span>
                        </div>
                        <div>
                            {searchUserPlan.planAcesses.map((planAcess) => (
                                <ul key={planAcess.id}>
                                    <li>{planAcess.string}</li>
                                </ul>
                            ))}
                        </div>
                    </div> 
                : 
                    <div className={Styles.dontHavePlan}>
                        <div>
                            <h1>User Doesn&apos;t Have a Plan</h1>
                        </div>
                        <Link href='/#priceplans'><button>Choose a Plan</button></Link>
                    </div>
                }
                <div className={Styles.upgradePlan}> 
                    <div className={Styles.image}>
                        <Image src='/imgs/9362.jpg' alt="Men Exercising" fill={true} quality={100} sizes="250px" priority></Image>
                    </div>
                    <h3>Upgrade Your Plan</h3>
                    <p>You will have access to all the networks gyms in Brazil and Latin America, you can relax in the massage chair and you can even take a friend to train five times a month.</p>
                    <Link href='/#priceplans'><button>Upgrade Now</button></Link>
                </div>
                <div className={Styles.yourUnit}>
                    <div className={Styles.image}>
                        <Image src='/imgs/1764.jpg' alt="Men Exercising" fill={true} quality={100} sizes="250px"></Image>
                    </div>
                    <h3>Your Unit</h3>
                    <h2>MINNESOTA, US</h2>
                    <p>Lorem ipsum dolor sit amet, 2051, 2051 - Aliquam explicabo aperiam, AT - 15897536</p>
                    <Link href='/changeUnit'><button>Change Unit</button></Link>
                </div>
            </div>
        </div>
    )
}

export default MyPlan;