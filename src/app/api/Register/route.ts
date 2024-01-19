import { NextResponse } from 'next/server';

import { Register } from '@/services/User/route';

export async function POST(req: Request){
    try{
        const body = await req.json();
        const data = await Register(body);

        if(data.success){
            return NextResponse.json({ ok: data.ok,  message: data.success }, { status: data.status });
        }
        return NextResponse.json({ ok: data.ok,  message: data.error }, { status: data.status });
    }catch (err){
        console.log(`erro: ${err}`)
        return new NextResponse("Server Error", { status: 500 });
    }
}
