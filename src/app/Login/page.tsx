'use client';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';

import { Root, createRoot } from 'react-dom/client';

import Styles from '@/app/styles/Login/Login.module.css';

import FeedBackMsg from "@/app/components/layout/FeedBackMsg";
import LoginForm from '@/app/components/login/LoginForm';

import { TwoFactorAuthForm } from '../components/login/TwoFactorAuthForm';
import { loginBodyProps } from '@/Types/route';


export default function Login() {
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    
    const [showtwoFactor, setShowtwoFactor] =  useState<boolean>(false);
    const [formData, setFormData] = useState<loginBodyProps>({
        email: '',
        password: '',
        code: ''
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rootRef = useRef<Root | null>(null);
  
    useEffect(() => {
      const domNode = document.getElementById('root');
      if (domNode && !rootRef.current) {
        rootRef.current = createRoot(domNode);
      }
    }, []);

    const handleFormEdit = (event:React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const POST = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = `${domain}/api/Login`;
        try{
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "content-type":"application/json"
                    },
                    body: JSON.stringify(formData),
                }
            );
            const resJson = await response.json();
            if(resJson.TwoFactor === true){
                setShowtwoFactor(true);
                showNotification(response.status, resJson.message);
                return;
            }
            showNotification(response.status, resJson.message);
        }catch(err){
            console.log(`error: ${err}`);
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
        <div className={Styles.login_container}>
            <div className={Styles.login}>
                <h1>LOGIN</h1>
                <p className="text-sm font-medium">Please Login to use the Plataform.</p>
                {showtwoFactor === false ? 
                    <LoginForm 
                        handleLoginForm={POST}
                        handleFormEdit={handleFormEdit}
                        formData={formData}
                    /> 
                : 
                    <TwoFactorAuthForm 
                        handleLoginForm={POST}
                        handleFormEdit={handleFormEdit}
                    />}
                <p className="text-sm font-bold -translate-y-2">Don’t Have an Account? <Link href='/Register'><u className="text-red-600">Register</u>.</Link></p>
                <div id='root'></div>
            </div>
        </div>
    )
}