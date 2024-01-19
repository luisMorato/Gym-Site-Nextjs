'use client';
import { useEffect, useRef, useState } from "react";

import { sendEmailToUs } from "@/lib/mail";
import { Root, createRoot } from "react-dom/client";
import FeedBackMsg from "../layout/FeedBackMsg";

type formProps = {
    firstName: string,
    lastName: string,
    email: string,
    message: string
}

export default function ContactForm() {
    const [ formData, setFormData ] = useState<formProps>({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rootRef = useRef<Root | null>(null);
  
    useEffect(() => {
      const domNode = document.getElementById('root');
      if (domNode && !rootRef.current) {
        rootRef.current = createRoot(domNode);
      }
    }, []);

    const handleFormEdit = (e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>, name: string) => {
        setFormData({... formData,
            [name]: e.target.value,
        });
    }

    const sendEmail = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await sendEmailToUs(formData);

        if(response){
            showNotification(response.status, response.success);
        }
        
        showNotification(response.status, response.error);
    }

    const showNotification = (status:number, resJson?: string) => {
        const styleName = status === 200 ? 'ok' : 'error';
        const msg = resJson || '';
    
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
        <form action="submit" onSubmit={sendEmail}>
            <div className='flex gap-6'>
                <input
                onChange={(e) => handleFormEdit(e, e.target.name)}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name *"
                required />
                
                <input
                onChange={(e) => handleFormEdit(e, e.target.name)}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name *"
                required />
            </div>

            <input
            onChange={(e) => handleFormEdit(e, e.target.name)}
            type="email" 
            name="email" 
            id="email" 
            placeholder="Your Better Email *" 
            required />

            <textarea
            onChange={(e) => handleFormEdit(e, e.target.name)}
            name="message" 
            id="message" 
            placeholder="Message *" 
            required ></textarea>

            <p>Required Fields (*)</p>
            <button type="submit">Submit</button>
        </form>
    )
}