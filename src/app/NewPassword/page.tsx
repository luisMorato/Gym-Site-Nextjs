'use client';
import { useEffect, useRef, useState } from "react";
import FeedBackMsg from "../components/layout/FeedBackMsg";
import { Root, createRoot } from "react-dom/client";
import { FaArrowRight } from "react-icons/fa";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Styles from '@/app/styles/ResetPassword/ResetPassword.module.css';

type formProps = {
    password: string,
    token: string | null
}

const NewPassword = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [newPasswordAndToken, setNewPasswordAndToken] = useState<formProps>({
        password: '',
        token: null
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rootRef = useRef<Root | null>(null);
  
    useEffect(() => {
      const domNode = document.getElementById('root');
      if (domNode && !rootRef.current) {
        rootRef.current = createRoot(domNode);
      }
    }, []);

    const handleFormEdit = (password: string) => {
        setNewPasswordAndToken({...newPasswordAndToken, 
            password: password,
            token: token
        });
    }

    const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = `${domain}/api/NewPassword`;

        try {
            const response = await fetch(url,
                {
                    method: 'PUT',
                    headers: {
                        "content-type":"application/json",
                    },
                    body: JSON.stringify(newPasswordAndToken)
                }
            )
            const resJson = await response.json();
            showNotification(response.status, resJson.message);
        } catch (err) {
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
                <p>Enter a new password?</p>
                <form className="flex flex-col" onSubmit={resetPassword}>
                    <label htmlFor="newPassword" className="font-semibold text-sm mt-5 mb-1 text-black">New Password:</label>
                    <input
                        className="mb-5"
                        onChange={(e) => handleFormEdit(e.target.value)}
                        name='newPassword'
                        type="password"
                        minLength={6}
                        placeholder="******"
                    />
                    <button type="submit">Reset Password<FaArrowRight className='text-red-600'/></button>
                    <Link href='/Login'>Back to Login</Link>
                </form>
            </div>
            <div id='root'></div>
        </div>
    )
}

export default NewPassword;