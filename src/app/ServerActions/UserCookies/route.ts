'use server';
import { cookies } from 'next/headers';

import { userProps } from '@/Types/route';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const setUserCookies = async (user: userProps) => {
    const userCookies = cookies();
    const oneDay = 24 * 60 * 60 * 1000;

    if(userCookies.get('userAuth')) cookies().delete('userAuth');

    userCookies.set('userAuth', JSON.stringify(user), { expires: Date.now() + oneDay });
}

export const getCookies = () => {
    const response = cookies();
    return response.get('userAuth');
}

export const updateCookieData = async () => {;
    const response = cookies();
    return await response.get('userAuth');
}

export const cleanCookies = async () => {
    const cookiesToClear = cookies();
    if(cookiesToClear.get('userAuth')){ 
        cookies().delete('userAuth');
        revalidatePath("http://localhost:3000/UserProfile/Profile");
        return NextResponse.redirect('http://localhost:3000/Login');
    }
}