'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';

import Styles from '@/app/styles/Login/Login.module.css';

type formProps = {
    handleLoginForm: (event:React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleFormEdit: (event:React.ChangeEvent<HTMLInputElement>, name: string) => void,
    formData: {
        email: string,
        password: string
    }
};

export default function LoginForm({ handleLoginForm, handleFormEdit, formData }: formProps) {
    const [ShownPswrd, setShownPswrd] = useState(true);

    const showHidePswrd = () => {
        setShownPswrd((ShownPswrd) => !ShownPswrd);
    };

    return(
            <form id='loginForm' className={Styles.login_form} action="submit" onSubmit={handleLoginForm} method='POST'>
                <div className={Styles.form_inputs}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={formData.email}
                        minLength={1}
                        maxLength={60}
                        onChange={(e) => handleFormEdit(e, e.target.name)}
                        required 
                    />
                    <label htmlFor="password">Password:</label>
                    <div className='flex items-center'>
                        <input
                            type= {ShownPswrd ? "password" : "text"}
                            name="password"
                            id="password"
                            value={formData.password}
                            minLength={1}
                            onChange={(e) => handleFormEdit(e, e.target.name)}
                            required
                        />
                        <div>
                            {ShownPswrd ? 
                                <FaEye onClick={() => showHidePswrd()} className='-ml-6 text-black cursor-pointer'/>
                                :
                                <FaEyeSlash onClick={() => showHidePswrd()} className='-ml-6 text-black cursor-pointer'/>
                            }
                        </div>
                    </div>
                    <Link href='/ResetPassword'>
                        <p className='text-xs font-bold mt-2 hover:underline'>Forgot Your Password?</p>
                    </Link>
                </div>
                <button type="submit">Login<FaArrowRight className='text-red-600'></FaArrowRight></button>
            </form>
    )
}