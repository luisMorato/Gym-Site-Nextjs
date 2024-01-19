'use client';
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import Styles from '@/app/styles/ResetPassword/ResetPassword.module.css';
import Link from "next/link";
import FeedBackMsg from "@/app/components/layout/FeedBackMsg";
import { Root, createRoot } from "react-dom/client";

const ResetPassword = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const [formEmail, setFormEmail] = useState('');

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rootRef = useRef<Root | null>(null);
  
    useEffect(() => {
      const domNode = document.getElementById('root');
      if (domNode && !rootRef.current) {
        rootRef.current = createRoot(domNode);
      }
    }, []);

    const handleFormEdit = (email: string) => {
        setFormEmail(email);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const url = `${domain}/api/ResetPassword`;

        try {
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        "content-type":"application/json",
                    },
                    body: JSON.stringify(formEmail)
                }
            )
            const resJson = await response.json();
            showNotification(response.status, resJson.message);
        } catch (err) {
            console.log('error: ', err);
            showNotification(500, "Error processing the request. Please, try again.");
        }
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
    
    return (
        <div className={Styles.ResetPasswordContainer}>
            <div className={Styles.ResetPassword}>
                <h1 className="text-xl font-semibold text-black text-center relative after:absolute after:bg-red-600 after:w-[120px] after:h-[3px] after:top-full after:left-1/2 after:-translate-x-1/2">Reset Password</h1>
                <p>Forgot your password?</p>
                <form className="flex flex-col" onSubmit={onSubmit}>
                    <label htmlFor="email" className="font-semibold text-base mt-5 mb-1 text-black">Email:</label>
                    <input
                        className="mb-5"
                        onChange={(e) => handleFormEdit(e.target.value)}
                        name='email'
                        type="email"
                        placeholder="JohnDoe@example.com"
                    />
                    <button type="submit"> Send Reset Email <FaArrowRight className='text-red-600'/></button>
                    <Link href='/Login'>Back to Login</Link>
                </form>
            </div>
            <div id='root'></div>
        </div>
    )
}

export default ResetPassword;