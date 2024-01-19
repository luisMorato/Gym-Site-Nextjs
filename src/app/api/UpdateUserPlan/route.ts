import { NextResponse } from 'next/server'

import { updateUserPlan } from '@/services/User/route'

export async function PUT(req: Request){
    try{
        const { userId, selectedPlan } = await req.json()
        const data = await updateUserPlan(userId, selectedPlan)

        if(data){
            if(data.success){
                return NextResponse.json({ok: data.ok,  message: data.success }, { status: data.status })
            }
            return NextResponse.json({ok: data.ok,  message: data.error }, { status: data.status })
        }
    }catch (err: any){
        console.log(`erro: ${err}`)
        return new NextResponse("Server Error", { status: 500 })
    }
}