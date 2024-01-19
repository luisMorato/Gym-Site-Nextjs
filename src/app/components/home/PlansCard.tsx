'use client';
import { useRouter } from 'next/navigation';

import { planProps } from '@/Types/route';

import Styles from '@/app/styles/home/PricePlans.module.css';


export const PlansCard = ({ plans, searchUser, plan, showNotification }: planProps) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    const router = useRouter();

    const setUserPlan = async (planId: number) => {
        if(searchUser === undefined){
            showNotification(422, "No Users Logged!");
            setTimeout(() => {
                router.push(`${domain}/Login`)
            }, 6000);
            return;
        }
        const selectedPlan = plans.find(({ id }) => id === planId);
        const userId = searchUser.id as string;

        const url = `${domain}/api/UpdateUserPlan`;
        await new Promise(async (resolve, reject) => {
            try{
                const response = await fetch(url,
                    {
                        method:'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, selectedPlan }),
                    }
                );
                const resJson = await response.json();
                showNotification(response.status, resJson.message);
                resolve(response);
                return true;
            }catch(error){
                console.log(`Error: ${error}`);
                showNotification(500, "Error processing the request. Please, try again.");
                reject(error);
                return false;
            }
        });
    }

    return (
        <div className={Styles.plan} onClick={() => setUserPlan(plan.id)}>
            <h1>{plan.level}</h1>
            <div className='mb-7'>
                <span>$ </span><h2>{plan.price}</h2><span> /MONTHLY</span>
            </div>
            {plan.planAcesses.map((planAcess) => (
                <ul key={`${plan.id}-${planAcess.id}`}>
                    <li>{planAcess.string}</li>
                </ul>
            ))}
        </div>
    )
}