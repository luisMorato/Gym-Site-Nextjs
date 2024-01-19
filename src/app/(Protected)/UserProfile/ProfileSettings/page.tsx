'use client';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { Root, createRoot } from 'react-dom/client';

import { GET } from '@/app/ServerActions/FetchUserData/route';

import FeedBackMsg from '@/app/components/layout/FeedBackMsg';

import Styles from '@/app/styles/UserProfile/Settings/Settings.module.css';
import ProfileSettingsForm from '@/app/components/UserProfile/Settings/ProfileSettingsForm';

type formDataProps = {
        firstName: string | undefined,
        lastName: string | undefined,
        email: string | undefined,
        password: string,
        newPassword: string,
        removePlan: boolean,
        twoFactorAuth: boolean | undefined
};

const ProfileSettings = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const [requirePassword, setRequirePassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rootRef = useRef<Root | null>(null);
  
    useEffect(() => {
      const domNode = document.getElementById('root');
      if (domNode && !rootRef.current) {
        rootRef.current = createRoot(domNode);
      }
    }, []);

    useEffect(() => {
        GET().then((data) => {
            setFormData({
                firstName: data?.firstName || '',
                lastName: data?.lastName || '',
                email: data?.email || '',
                password: '',
                newPassword: '',
                removePlan: false,
                twoFactorAuth: data.isTwoFactorAuth
            });
        });
    }, []);

    const [formData, setFormData] = useState<formDataProps>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        newPassword: '',
        removePlan: false,
        twoFactorAuth: undefined
    });

    const handleFormEdit = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData({...formData,
            [name]: event.target.value,
        });
    }

    const saveChanges = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition( async () => {
            if(formData.password === ''){
                setRequirePassword(true);
                return;
            }
            setRequirePassword(false);

            const url = `${domain}/api/UpdateUserData`;
            try {
                const response = await fetch(url,
                    {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    }
                );
                const resJson = await response.json();
                showNotification(response.status, resJson.message);
            } catch (err) {
                console.log('error: ', err);
                showNotification(500, "Error processing the request. Please, try again.");
            };
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
    
    return (
        <div className={Styles.settingsContainer}>
            <h1 className="relative text-left after:bg-red-600 after:h-[3px] after:left-0 after:absolute after:top-full after:w-20 mb-5 font-bold text-xl">Account Settings</h1>
            <div className={Styles.settings}>
                <ProfileSettingsForm 
                    saveChanges={saveChanges}
                    handleFormEdit={handleFormEdit}
                    isPending={isPending}
                    formData={formData}
                    requirePassword={requirePassword}
                    setFormData={setFormData}
                />
            </div>
            <div id="root"></div>
        </div>
    )
}

export default ProfileSettings;