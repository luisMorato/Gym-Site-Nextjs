import { NextResponse } from "next/server";

import { updateUserData } from '@/services/User/route';

export const PUT = async (req: Request) => {
    try {
        const body = await req.json();
        const data = await updateUserData(body);

        if(data){
            if(data.success){
                return NextResponse.json({ok: data.ok,  message: data.success }, { status: data.status });
            }
            return NextResponse.json({ok: data.ok,  message: data.error }, { status: data.status }); 
        }  
    } catch (err) {
        console.log(`erro: ${err}`)
        return new NextResponse("Server Error", { status: 500 });
    }
}