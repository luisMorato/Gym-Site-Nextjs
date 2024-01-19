'use client'
import data from '@/../public/data/Data.json';
const { plans } =  data;

import { useEffect, useRef, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';

import { fetchUserData } from '@/app/ServerActions/FetchUserData/route'

import { userProps } from '@/Types/route';

import { PlansCard } from './PlansCard';
import FeedBackMsg from '../layout/FeedBackMsg';

import Styles from '@/app/styles/home/PricePlans.module.css';

export default function PricePlans() {
    const [searchUser, setSearchUser] = useState<userProps | undefined> (undefined)

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const rootRef = useRef<Root | null>(null)
  
    useEffect(() => {
        const domNode = document.getElementById('root')
        if (domNode && !rootRef.current) {
          rootRef.current = createRoot(domNode)
        }
      }, [])

    useEffect(() => {
        fetchUserData().then((data) => {
            setSearchUser(data)
        })
    }, [])

    const showNotification = (status:number, resJson:string) => {
        const styleName = status === 200 ? 'ok' : 'error';
        const msg = resJson;
    
        const component = (
          <FeedBackMsg
            text={msg}
            styleName={styleName}
          />
        );
        renderComponent(component);
    
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          cleanNotification();
        }, 5000);
      }
    
    const cleanNotification = () => {
        const component = (
            <FeedBackMsg
            text=""
            styleName="hide"
            />
        );
        renderComponent(component);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = null;
    }
    
    const renderComponent = (component:React.ReactNode) => {
        if (rootRef.current) {
            rootRef.current.render(component);
        }
    }
    
    return (
        <div id='priceplans' className={Styles.PricePlans}>
            {plans.map((plan) => (
                <PlansCard 
                plans={plans} 
                searchUser={searchUser} 
                plan={plan} key={plan.id} 
                showNotification={showNotification}
                />
            ))}
        </div>
    )
}