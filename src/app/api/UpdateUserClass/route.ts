import { NextResponse } from 'next/server';

import { updateUserClasses } from '@/services/User/route';

export async function PUT(req: Request){
    try{
        const { userId, selectedClass } = await req.json();
        const data = await updateUserClasses(userId, selectedClass);

        if(data.success){
            return NextResponse.json({ok: data.ok,  message: data.success }, { status: data.status });
        }
        return NextResponse.json({ok: data.ok,  message: data.error }, { status: data.status });
    }catch (err){
        console.log(`erro: ${err}`)
        return new NextResponse("Server Error", { status: 500 });
    }
}