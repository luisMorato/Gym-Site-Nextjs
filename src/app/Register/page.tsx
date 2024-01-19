'use client';
import RegisterForm from '../components/Register/RegisterForm';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Root, createRoot } from 'react-dom/client';

import Styles from '@/app/styles/Register/Register.module.css';

import FeedBackMsg from "@/app/components/layout/FeedBackMsg";

export default function Register() {
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateBirth: '',
        phoneNumber: '',
        email: '',
        createPassword: '',
        repeatPassword: ''
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rootRef = useRef<Root | null>(null);

    useEffect(() => {
        const domNode = document.getElementById('root');
        if (domNode && !rootRef.current) {
          rootRef.current = createRoot(domNode);
        }
      }, []);

    const handleFormEdit = (event:React.ChangeEvent<HTMLInputElement>, name:string) => {
        setFormData({
            /*'...' -> Spread Usado para pegar todos os dados já contidos na variável além dos novos à serem inseridos*/
            ...formData,
            [name]: event.target.value
        });
    }

    const POST = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = `${domain}/api/Register`;
        try{
            const response = await fetch(url,
                {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                }
            )
            const resJson = await response.json();
            showNotification(response.status, resJson.message);
        }catch(error){
            console.log(`Error: ${error}`);
            showNotification(500, "Error processing the request. Please, try again.");
        }
    }

    const showNotification = (status:number, resJson:string) => {
        const styleName = status === 201 ? 'ok' : 'error';
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
        <div className={Styles.register_container}>
            <div className={Styles.register}>
                <h1>Create an Account</h1>
                <RegisterForm 
                    formData={formData} 
                    handleFormEdit={handleFormEdit} 
                    handleForm={POST}
                />
                <p className='text-black font-bold text-sm'>Already Have an Account? <u className='text-red-600'><Link href="/Login">Sign In</Link></u>.</p>
            </div>
            <div id="root"></div>
        </div>
    )
}