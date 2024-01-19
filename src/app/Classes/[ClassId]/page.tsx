'use client'
import data from '@/../public/data/Data.json';
const { classes } = data;

import Link from 'next/link';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';

import { userProps } from '@/Types/route';
import { fetchUserData } from '@/app/ServerActions/FetchUserData/route';

import FeedBackMsg from '@/app/components/layout/FeedBackMsg';

import Styles from '../[ClassId]/EachClass.module.css';


export default function Class({ params }: any){
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    const search = classes.find((eachClass) => eachClass.id === Number(params.ClassId));

    const backgroundImg = {
        backgroundImage: `url(${search?.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius:'28px',
        height: '500px',
        width: '75%',
    };

    const [searchUser, setSearchUser] = useState<userProps | undefined> (undefined);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rootRef = useRef<Root | null>(null);
  
    useEffect(() => {
        const domNode = document.getElementById('root');
        if (domNode && !rootRef.current) {
          rootRef.current = createRoot(domNode);
        }
      }, []);

    const router = useRouter();

    useEffect(() => {
        fetchUserData().then((data) => {
            setSearchUser(data)
        })
    }, [])

    const setUserClass = async () => {
        if(searchUser === undefined){
            showNotification(422, "No Users Logged!");
            setTimeout(() => {
                router.push(`${domain}/Login`);
            }, 6000);
            return;
        }
        const selectedClass = search;
        const userId = searchUser.id;

        const url = `${domain}/api/UpdateUserClass`;
        await new Promise(async (resolve, reject) => {
            try{
                const response = await fetch(url,
                    {
                        method:'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, selectedClass }),
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
        })
    }

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

    return(
        <div className={Styles.container}>
            <h1 className={Styles.title}>{search?.type}</h1>
            <div className={Styles.content}>
                <div style={backgroundImg}></div>
                <div className='flex flex-col items-center justify-center w-fit'>
                    <h1 className='text-black text-3xl font-bold mb-6 relative'>{search?.type}</h1>
                    <p className='text-black text-lg font-bold mb-4'>{search?.ClassDesc}</p>
                    <p className='text-black text-lg font-bold mb-4'>{search?.schedule}</p>
                    <button onClick={() => setUserClass()}>Join Now <FaArrowRight className='text-red-600'/></button>
                </div>
            </div>
            <Link href='/Classes'><p className='flex items-center text-black text-lg font-bold translate-y-12 gap-1 ml-5 w-fit hover:text-red-600'><FaArrowLeft/> Go Back</p></Link>
            <div id="root"></div>
        </div>
    )
}