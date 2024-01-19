import { auth } from '@/auth'
import { Login } from '@/services/User/route'

import { NextResponse } from 'next/server'

export const POST = auth( async (req: Request) => {
    try{
        const body = await req.json();
        const data = await Login(body);

        if(!data.error){
            return NextResponse.json({ TwoFactor: data.twoFactor, ok: data.ok,  message: data.success }, { status: data.status });
        }else{
            return NextResponse.json({ TwoFactor: data.twoFactor, ok: data.ok,  message: data.error }, { status: data.status });
        }
    }catch(err: any){
        console.error('Error during POST:', err);
        //Correct Error: I Return Success message because whenever the NEXT_REDIRECT error is shown, it's because the DEFAULT_LOGIN_REDIRECT is triggered and the Login request was successful (NEXT_REDIRECT get a conflict when used with tryCatch block).
        const errorMsg = err.message;
        if(errorMsg.includes('NEXT_REDIRECT')) return NextResponse.json({ message: 'User Logged' }, { status: 200 });
    }
})