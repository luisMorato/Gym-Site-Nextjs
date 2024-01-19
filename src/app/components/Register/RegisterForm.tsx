'use client';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

import Styles from '@/app/styles/Register/Register.module.css'

type formProps = {
    formData: {
        firstName: string,
        lastName: string,
        dateBirth: string,
        phoneNumber: string,
        email: string,
        createPassword: string,
        repeatPassword: string
    },
    handleFormEdit: (event:React.ChangeEvent<HTMLInputElement>, name: string) => void,
    handleForm: (event:React.FormEvent<HTMLFormElement>) => Promise<void>
}

export default function RegisterForm({ formData, handleFormEdit, handleForm }: formProps) {
    const [ShownCratePswrd, setShownCreatePswrd] = useState(true);
    const [ShownRepeatePswrd, setShownRepeatPswrd] = useState(true);

    //TODO: Add a input mask for dateBirth and phoneNumber.

    const showHidePswrd = (name:string) => {
        if(name === 'createPassword'){
            setShownCreatePswrd((ShownCratePswrd) => !ShownCratePswrd);
        }else{
            setShownRepeatPswrd((setShownRepeatPswrd) => !setShownRepeatPswrd);
        }
    }

    return(
        <form id="registerForm" onSubmit={handleForm} action="submit" method='POST'>
            <div className='flex flex-col gap-6 justify-center'>
                <div className='flex gap-8'>
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder='First Name*'
                        value={formData.firstName} 
                        onChange={(e) => handleFormEdit(e, 'firstName')}
                        minLength={1}
                        maxLength={60}
                        required
                    />
                    <input 
                        type="text" 
                        name="lastName"
                        id='lastName'
                        placeholder='Last Name*'
                        value={formData.lastName} 
                        onChange={(e) => handleFormEdit(e, 'lastName')}
                        minLength={1}
                        maxLength={60}
                        required
                    />
                </div>
                <div className='flex gap-8'>
                    <input 
                        type="text" 
                        name="DateBirth" 
                        id="DateBirth"
                        placeholder='Date of Birth*'
                        value={formData.dateBirth} 
                        onChange={(e) => handleFormEdit(e, 'dateBirth')}
                        minLength={1}
                        maxLength={10}
                        required
                    />
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        id="phoneNumber" 
                        placeholder='Phone Number*'
                        value={formData.phoneNumber === '' ? '' : formData.phoneNumber} 
                        onChange={(e) => handleFormEdit(e, 'phoneNumber')}
                        minLength={1}
                        maxLength={15}
                        required
                    />
                </div>
            </div>
            <div>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder='Email*' 
                    value={formData.email} 
                    onChange={(e) => handleFormEdit(e, 'email')}
                    minLength={1}
                    maxLength={60}
                    required
                />
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center relative'>
                    <input
                        type={ShownCratePswrd ? "password" : "text"}
                        name="createPassword"
                        id="createPassword"
                        placeholder='Create Password*'
                        value={formData.createPassword} 
                        onChange={(e) => handleFormEdit(e, 'createPassword')}
                        minLength={6}
                        maxLength={20}
                        required
                    />
                    <div className='absolute right-1'>
                        {ShownCratePswrd ? 
                            <FaEye onClick={() => showHidePswrd('createPassword')} className={Styles.eye_icon}/>
                            :
                            <FaEyeSlash onClick={() => showHidePswrd('createPassword')} className={Styles.eye_icon}/>
                        }
                    </div>
                </div>
                <div className='flex items-center relative'>
                    <input
                        type={ShownRepeatePswrd ? "password" : "text"}
                        name="repeatPassword"
                        id="repeatPassword"
                        placeholder='Repeat Password*'
                        value={formData.repeatPassword} 
                        onChange={(e) => handleFormEdit(e, 'repeatPassword')}
                        minLength={6}
                        maxLength={20}
                        required
                    />
                    <div className='absolute right-1'>
                        {ShownRepeatePswrd ? 
                            <FaEye onClick={() => showHidePswrd('repeatPassword')} className={Styles.eye_icon}/>
                            :
                            <FaEyeSlash onClick={() => showHidePswrd('repeatPassword')} className={Styles.eye_icon}/>
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <p className='text-sm -translate-y-3'>Required Fields (*)</p>
                <button type='submit'>Register<FaArrowRight className='text-red-600'/></button>
            </div>
        </form>
    )
}