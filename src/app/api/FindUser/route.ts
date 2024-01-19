import { getUsersByEmail } from '@/services/User/route';
import { auth } from '@/auth';

import { NextResponse } from 'next/server';

export const GET = auth( async (req: Request) => {
    try{
        const queryParams = new URLSearchParams(req.url.split('?')[1]);
        const email = queryParams.get('email') as string;

        const data = await getUsersByEmail(email);

        if(data){
            return NextResponse.json({ user: data, ok: true,  message: 'User Found' }, { status: 200 });
        }else{
            return NextResponse.json({ user: null, ok: false,  message: 'User Not Found' }, { status: 422 });
        }
    } catch (err:any){
        return new NextResponse("Server Error", { status: 500 });
    }
})